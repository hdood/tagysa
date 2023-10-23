<template>
  <Head>
    <title>Appearance</title>
  </Head>

  <!-- <ProfileTabs class="hidden lg:flex" />
  <ProfileTabsMobile class="lg:hidden" /> -->
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUser();
});
</script>
