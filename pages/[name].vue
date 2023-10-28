<template>
  <Head>
    <title>{{ user.full_name }}</title>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
  </Head>

  <div class="bg-base-200 min-h-screen min-w-[100vw] flex flex-col items-center pt-10 px-2 " v-if="user.id">
    <div
      class="flex flex-col justify-center min-w-[20rem] max-w-xs lg:max-w-sm p-6 shadow-md rounded-xl sm:px-12 bg-base-100">
      <!-- <img src="https://source.unsplash.com/150x150/?portrait?3" alt="" class="rounded-full dark:bg-gray-500 aspect-square"> -->
      <div class="avatar">
        <div class="mask mask-squircle w-32 h-32 mx-auto ">
          <img :src="user.image" />
        </div>
      </div>
      <div class="space-y-4 text-center divide-y divide-gray-700">
        <div class="my-2 space-y-1">
          <h2 class="text-xl font-semibold sm:text-2xl">{{ user.full_name }}</h2>
          <p class="px-5 text-xs sm:text-base dark:text-gray-400">
            {{ user.designation }}
          </p>
        </div>
        <div class="flex justify-center  items-center pt-2 gap-4 flex-wrap ">
          <a v-for="link in user.links" rel="noopener noreferrer" target="_blank" :href="link.url" :aria-label="link.name"
            class="p-2 rounded-md ">
            <icon :name="link.icon" size="30" />
          </a>

        </div>
      </div>
    </div>
    <div
      class="flex flex-col justify-center  min-w-[20rem]  mt-3 max-w-xs lg:max-w-sm  p-6 shadow-md rounded-xl sm:px-12 bg-base-100 text-center">
      <h1 class="w-full text-xl font-medium flex items-center justify-center gap-2">
        About me
      </h1>
      <h2>
        {{ user.bio }}
      </h2>
    </div>
    <a v-if="user.phone" :href="'tel:' + user.phone"
      class="flex flex-col justify-center  min-w-[20rem]  mt-3 max-w-xs lg:max-w-sm  p-6 shadow-md rounded-xl sm:px-12 bg-base-100 text-center">
      <h1 class="w-full text-xl font-medium flex items-center justify-center gap-2">
        <icon name="ic:baseline-phone" />
        Phone
      </h1>
      <h2>
        +{{ user.country_code }} {{ user.phone }}
      </h2>
    </a>
    <a v-if="user.contact_email" :href="'mailto:' + user.email"
      class="flex flex-col justify-center  min-w-[20rem]  mt-3 max-w-xs lg:max-w-sm  p-6 shadow-md rounded-xl sm:px-12 bg-base-100 text-center">
      <h1 class="w-full text-xl font-medium flex items-center justify-center gap-2">
        <icon name="ic:baseline-email" />
        Email
      </h1>
      <h2>
        {{ user.contact_email }}
      </h2>
    </a>

    <a v-if="user.address" target="_blank" :href="'https://www.google.com/maps/search/?q=' + user.address"
      class="flex flex-col justify-center  min-w-[20rem]  mt-3 max-w-xs lg:max-w-sm  p-6 shadow-md rounded-xl sm:px-12 bg-base-100 text-center">
      <h1 class="w-full text-xl font-medium flex items-center justify-center gap-2">
        <icon name="mdi:location" />
        Address
      </h1>
      <h2 class="break-words">
        {{ user.address }}
      </h2>
    </a>

    <a v-if="user.website" target="_blank" :href="user.website"
      class="flex flex-col justify-center  min-w-[20rem]  mt-3 max-w-xs lg:max-w-sm  p-6 shadow-md rounded-xl sm:px-12 bg-base-100 text-center">
      <h1 class="w-full text-xl font-medium flex items-center justify-center gap-2">
        <icon name="mdi:earth" />
        Website
      </h1>
      <h2 class="break-words">
        {{ user.website }}
      </h2>
    </a>
  </div>
  <div v-else>
    user not found
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import themes from "~/data/themes";
import { useProfileStore } from "~~/stores/profile";
const profileStore = useProfileStore();
import ProfileLoading from "~/components/ProfileLoading.vue";
import TestimonialsSection from "~/themes/shared/TestimonialsSection.vue";
const { user } = storeToRefs(profileStore);

const route = useRoute();
const preview = route.query.preview === "true";
const landing = route.query.landing === "true";
const previewTheme = route.query.theme ?? "light";

onMounted(async () => {
  await profileStore.fetchProfile(route.params.name);
  if (preview) return;
  await profileStore.storeVisitor();
});
const layout = computed(() => {
  const fallback = () => h(ProfileLoading);
  if (!user.value?.layout) return fallback;
  return defineAsyncComponent(() =>
    import(`~/themes/${theme.value.layout}/main.vue`)
  );
});

const theme = computed(() => {
  if (!landing) {
    return themes.find((theme) => theme.name == user.value?.theme);
  }
  return themes.find((theme) => theme.name == previewTheme);
});
</script>

<style scoped></style>
