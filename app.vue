<template>
  <!-- <VitePwaManifest /> -->

  <Head>
    <link rel="icon" type="image/x-icon" href="~/assets/logo.svg" />
  </Head>
  <div class="min-w-screen min-h-screen" 
  :data-theme="theme"
  :dir="locale == 'ar' ? 'rtl' : 'ltr'">
    <NuxtPage />
  </div>

  <!-- <Notifications /> -->
</template>

<script setup>
import { useUserStore } from "~~/stores/user";
import { theme } from "./data/theme";

const { locale } = useI18n();
const userStore = useUserStore();

userStore.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    after((result) => {
      if (name != "refreshFrame") {
        store.refreshFrame();
      }
    });
  }
);

onMounted(async () => {
  try {
    await userStore.getCSRFCookie();
  } catch (error) {
    console.log(error);
  }
});
</script>
<style>
* {
  transition: color 100ms ease, background-color 300ms ease;
}

body {
  overflow-x: hidden;
}
</style>
