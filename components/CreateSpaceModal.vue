<template>
  <TransitionRoot appear :show="props.show" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[999]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md h-full flex flex-col transform overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium bg-text-content mb-7"
              >
                <span>Create Space</span>
              </DialogTitle>

              <form @submit.prevent="createSpace">
                <div>
                  <TextInput
                    type="text"
                    label="Name"
                    v-model:input="space.name"
                    :error="error"
                  />
                </div>
                <div class="w-full flex justify-end mt-4">
                  <Button type="primary" class="h-10 px-3" :loading="loading">
                    Create
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useSpacesStore } from "~/stores/spaces";
const spacesStore = useSpacesStore();

const error = ref("");
const loading = ref(false);
const { spaces } = storeToRefs(spacesStore);

const emit = defineEmits(["close", "add"]);
const props = defineProps(["show"]);

const space = ref({
  name: "",
});

async function createSpace() {
  error.value = "";
  if (space.value.name == "") {
    error.value = "space name is required";
    return;
  }

  const existingSpace = spaces.value.find(
    (_space) => _space.name === space.value.name
  );

  if (existingSpace) {
    error.value = "space already exists";
    return;
  }
  loading.value = true;
  await spacesStore.store(space.value);
  loading.value = false;
  await spacesStore.fetchAll();
  space.value.name = "";
  emit("close");
}

function closeModal() {
  emit("close");
}
</script>
