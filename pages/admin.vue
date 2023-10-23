<template>
  <AdminLayout>
    <NuxtPage />
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
definePageMeta({ middleware: "is-logged-out" });
</script>

<style scoped></style>
