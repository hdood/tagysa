<template>
  <!-- navigation bar -->

  <div
    class="fixed top-5 w-full flex justify-center transition-all z-[70]"
    v-motion-slide-top
  >
    <ContactSaverModal :show="showSaveModal" @close="showSaveModal = false" />
    <div
      id="navigation-bar"
      class="transition bg-base-100 duration-300 w-11/12 h-14 rounded-md z-[60] flex justify-between gap-2 items-center shadow-lg px-2"
      :class="[threshold && 'bg-opacity-80']"
    >
      <RouterLink to="/">
        <Logo class="scale-50" />
      </RouterLink>
      <SearchInput
        v-slot="{ active, user, selected }"
        combobox-classes="absolute mt-4 -left-14 lg:left-0 max-h-60 max-w-md min-w-[17rem] lg:min-w-[15rem] flex flex-col overflow-auto rounded-md bg-base-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
      >
        <a
          :href="'/' + user.name"
          target="_blank"
          class="relative flex gap-3 m-1 select-none items-center py-2 px-3 rounded-md cursor-pointer"
          :class="{
            'border-primary border text-neutral': active,
          }"
        >
          <div class="avatar">
            <div class="w-10 rounded-full">
              <img :src="user.image" :alt="`${user.name} profile image`" />
            </div>
          </div>
          <div class="flex flex-col">
            <span
              class="block truncate"
              :class="{
                'font-medium': selected,
                'font-normal': !selected,
              }"
            >
              {{ user.name }}
            </span>
            <span
              class="block truncate text-xs"
              :class="{
                'font-medium': selected,
                'font-normal': !selected,
              }"
            >
              {{ user.full_name }}
            </span>
          </div>
        </a>
      </SearchInput>
      <div class="flex items-center gap-2 text-base-content">
        <!-- <a href="/">
					<button class="btn btn-primary btn-sm rounded-md">
						Get your card
					</button>
				</a> -->
        <!-- <button
					class="btn btn-primary btn-sm rounded-md"
					@click="showShareModal = true"
				>
					<icon
						size="20"
						name="material-symbols:share-outline"
					/>
				</button> -->
        <!-- <button
					class="btn btn-primary btn-sm rounded-md"
					@click="showShareModal = true"
				>
					<icon
						size="20"
						name="material-symbols:share-outline"
					/>
				</button> -->
        <icon
          @click="downloadCard"
          size="25"
          name="material-symbols:download"
        />
        <OptionsMenu />
        <!-- <div class="avatar">
					<div
						class="rounded ring ring-primary ring-offset-base-100 ring-offset-2"
						:class="[threshold ? 'w-8 ' : 'w-0 opacity-0']"
						id="avatar"
					>
						<img
							:src="user.image"
							alt="Tailwind-CSS-Avatar-component"
						/>
					</div>
				</div> -->
      </div>
    </div>
  </div>
  <ShareModal
    :show="showShareModal"
    @close="showShareModal = false"
    :user="user"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProfileStore } from "~~/stores/profile";
import OptionsMenu from "~/themes/shared/OptionsMenu.vue";
import ContactSaverModal from "~/themes/shared/ContactSaverModal.vue";


const makeCard = useVcard()

const profileStore = useProfileStore();
const { user } = storeToRefs(profileStore);

const threshold = ref(false);

const showShareModal = ref(false);
const showSaveModal = ref(false);

function downloadCard() {
  makeCard(
    user.value.name,
    user.value.email,
    `+${user.value.country_code} ${user?.value?.phone}`,
    user.value.address,
    user.value.website
  );
  showSaveModal.value = true;
}

onMounted(async () => {
  document.addEventListener("scroll", () => {
    const nav = document.getElementById("navigation-bar");
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollTop > 200) {
      threshold.value = true;
      return;
    }
    threshold.value = false;
  });
});
</script>

<style scoped></style>
