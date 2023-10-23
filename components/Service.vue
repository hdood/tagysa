<template>
  <div>
    <Disclosure
      class="w-full rounded-xl px-2 flex flex-col bg-base-300 p-2 shadow overflow-hidden"
      as="div"
    >
      <div class="flex items-center gap-3 justify-between">
        <div class="flex items-center gap-5 text-base-content">
          <icon name="mdi:drag" size="35" class="cursor-move handle" />
          <div class="flex gap-2 items-center">
            <img :src="service.image" class="h-10 w-10 rounded-lg" />
            <div>
              <div>
                {{ service.name }}
              </div>
              <div class="text-xs">
                {{ service.url }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-3 items-center">
          <Button type="danger" class="btn-sm" @click="showDeleteModal = true">
            <div class="flex gap-2 items-center">
              <icon name="ic:round-delete" />
            </div>
          </Button>
          <button class="btn btn-sm btn-info" onclick="update_service_modal.showModal()">
            <icon name="material-symbols:edit" />
          </button>
        </div>
      </div>
      <transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 h-0"
        leave-active-class="transition-all"
        leave-to-class="opacity-0 h-0"
      >
        <DisclosurePanel
          class="text-gray-500 mt-2 bg-white rounded-xl"
          as="div"
        >
          <Testimonials :service="service" />
        </DisclosurePanel>
      </transition>
    </Disclosure>
    <dialog id="update_service_modal" class="modal">
      <div method="dialog" class="modal-box">
        <div class="mt-10 flex flex-col gap-5">
          <TextInput
            v-model:input="name"
            placeholder="Service Name"
            label="Service Name"
            :error="errors?.name"
          />
          <TextInput
            v-model:input="url"
            placeholder="URL "
            label="URL (optional)"
            :error="errors?.url"
          />
          <div class="flex flex-col gap-1">
            <span class="text-sm font-medium">Price</span>
            <div class="join">
              <select
                name=""
                v-model="currency"
                id=""
                class="select select-primary dropdown join-item"
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
              </select>
              <div>
                <div class="">
                  <input
                    id="placeholder"
                    placeholder="Price"
                    maxlength="10"
                    class="input input-bordered max-w-xs input-primary join-item w-40"
                    type="number"
                    v-model="price"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <label for="bio" class="flex flex-col gap-2">
            <span class="text-sm font-medium">Description</span>

            <textarea
              class="textarea textarea-primary text-sm w-full py-3.5 px-3"
              placeholder="Bio"
              v-model="description"
              rows="4"
              maxlength="300"
              id="bio"
            ></textarea>
          </label>

          <FileInput v-model="image">
            <Button type="success" class="px-2 h-10">Upload Image</Button>

            <div class="italic text-red-400" v-if="errors?.image">
              please select an image for the service
            </div>
          </FileInput>
        </div>

        <Button
          type="primary"
          class="mx-auto h-10 px-2 mt-4"
          @click="updateService"
          :loading="loading"
        >
          Add service
        </Button>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <ConfirmModal
      :show="showDeleteModal"
      title="Delete Service"
      body="Are you sure you want to delete this service"
      type="danger"
      positive="Delete"
      @close="showDeleteModal = false"
      @confirm="deleteService"
    />
  </div>
</template>

<script setup>
import { useServicesStore } from "~/stores/services";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/skyblue";
import { useUserStore } from "~/stores/user";

const servicesStore = useServicesStore();
const userStore = useUserStore();

const showDeleteModal = ref(false);
const { destroy, fetchAll, update } = servicesStore;

const props = defineProps({
  service: Object,
});
const { service } = toRefs(props);

const name = ref(service.value.name);
const url = ref(service.value.url);
const description = ref(service.value.description);
const image = ref();
const loading = ref(false);
const price = ref(service.value.price);
const errors = ref({});
const currency = ref("USD");
// const uploadedImageSource = computed(() => URL.createObjectURL(image.value));

const formattedPrice = computed(() =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.value,
  }).format(price.value)
);

async function updateService() {
  errors.value == {};
  if (name.value == "") {
    errors.value.name = "the name field is required";
    return;
  }
  if (!ValidateUrl(url.value) && url.value != "") {
    errors.value.url = "the url field must be a valid url";
    return;
  }

  loading.value = true;
  await update(
    service.value.id,
    name.value,
    url.value,
    description.value,
    image.value,
    formattedPrice.value
  );
  loading.value = false;
  await fetchAll();
  await useUserStore().getUser();
  update_service_modal.close();
}

async function deleteService() {
  await destroy(service.value.id);
  await fetchAll();
  await userStore.getUser();
}
</script>
