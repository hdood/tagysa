<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton :class="open ? '' : 'text-opacity-90'" class="btn btn-sm">
      <icon name="fluent-mdl2:add-friend" />
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="absolute border z-50 bg-base-100 -translate-x-full p-4 shadow-lg rounded-lg min-w-fit"
      >
        <h1 class="text-2xl font-medium mb-4">Requests</h1>
        <div v-if="user.requests.length != 0" class="space-y-4">
          <div
            class="flex items-center justify-between gap-5 rounded-lg p-2 bg-base-200"
            v-for="user in user.requests"
            :key="user.id"
          >
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img :src="user.image" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ user.name }}</div>
                <div class="text-sm opacity-50">{{ user.email }}</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button class="btn btn-primary">Confirm</button>
              <button class="btn bg-base-100">Reject</button>
            </div>
          </div>
        </div>
        <div v-else>You have no requests</div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/user";

const { user } = storeToRefs(useUserStore());
</script>
