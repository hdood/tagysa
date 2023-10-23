<template>
  <TransitionRoot appear :show="props.show" as="div">
    <Dialog as="div" @close="emits('close')" class="relative z-[99]">
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
              class="flex gap-6 justify-center min-w-[17rem] flex-col items-center max-w-md transform rounded-2xl bg-base-200 p-6 shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="flex gap-14 items-center">
                <span>Select Spaces</span>
                <div class="">
                  <Button
                    type="primary"
                    class="btn-sm"
                    @click="showAddModal = true"
                  >
                    <icon name="ic:baseline-plus" />
                  </Button>
                </div>
              </DialogTitle>
              <div class="flex flex-col gap-3 mt-4">
                <div class="form-control">
                  <label
                    class="label cursor-pointer space-x-8"
                    v-for="space in spaces"
                    :key="space.id"
                  >
                    <span class="label-text">{{ space.name }} </span>
                    <input
                      type="checkbox"
                      v-model="checkedSpaces"
                      class="checkbox checkbox-primary"
                      checked="checked"
                      :value="space.id"
                    />
                  </label>
                </div>
              </div>
              <div class="flex justify-end w-full">
                <Button @click="addToSpace" type="primary"> Submit </Button>
              </div>

              <CreateSpaceModal
                :show="showAddModal"
                @close="showAddModal = false"
              />
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
import { useUserStore } from "~/stores/user";

const props = defineProps(["show", "authenticated"]);
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const emits = defineEmits(["close"]);
const checkedSpaces = ref([]);
const spacesStore = useSpacesStore();
const showAddModal = ref(false);
const { spaces } = storeToRefs(spacesStore);
const { attachUser, detachUser } = spacesStore;

// const atLeastAddedToOne = computed(() =>
// 	spaces.value.some((space) => exists(space))
// );

async function addToSpace() {
  checkedSpaces.value.forEach(async (spaceId) => {
    const space = spaces.value.find((space) => space.id == spaceId);
    if (exists(space)) return;
    await attachUser(spaceId, useRoute().params.name);
  });

  spaces.value.forEach(async (space) => {
    if (checkedSpaces.value.includes(space.id) || !exists(space)) return;
    await detachUser(space.id, useRoute().params.name);
  });
  emits("close");

  setTimeout(async () => {
    spaces.value = [];
    await spacesStore.fetchAll();
    reloadSpaces();
  }, 100);
}

function exists(space) {
  return space.users.some(
    (user) => user.name.toLowerCase() === useRoute().params.name.toLowerCase()
  );
}

function reloadSpaces() {
  spaces.value.forEach(
    (space) => exists(space) && checkedSpaces.value.push(space.id)
  );
}

onMounted(async () => {
  await spacesStore.fetchAll();
  reloadSpaces();
});
</script>
