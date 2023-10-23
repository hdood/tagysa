<template>
  <div
    v-if="show"
    id="sticky-banner"
    tabindex="-1"
    class="z-50 flex justify-between w-full p-4 border-b bg-primary"
  >
    <div class="flex items-center mx-auto">
      <p
        class="flex items-center text-sm font-normal text-primary-content space-x-3"
      >
        <svg
          class="w-6 h-6 text-primary-content"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m4.2 14.2L11 13V7h1.5v5.2l4.5 2.7l-.8 1.3Z"
          />
        </svg>

        <span class="sr-only">Light bulb</span>
        <span
          >Currently on Free Trial - Days Remaining: {{ user.trailLeftDays }}.
          <RouterLink to="/admin/nfc" class="link"
            >Upgrade Now for Unlimited Access!</RouterLink
          ></span
        >
      </p>
    </div>
    <div class="flex items-center">
      <button
        @click="show = false"
        data-dismiss-target="#sticky-banner"
        type="button"
        class="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-primary-content hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close banner</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/user";

const { user } = storeToRefs(useUserStore());

const show = ref(true);
</script>

<style scoped></style>
