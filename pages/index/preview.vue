<template>
    <div class=" ">
        <iframe ref="frame" :src="'/' + user.name + '?preview=true'" class="min-h-screen w-full" frameborder="0"></iframe>
    </div>
    <div class="lg:hidden md:fixed fixed bottom-3 w-full z-50">
        <BottomNavigation />
      </div></template>

<script setup>
import { useUserStore } from '~~/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { user, frame: _frame } = storeToRefs(userStore);
const frame = ref(null)

definePageMeta({ middleware: ['is-logged-out', "verify-email"]});

onMounted(() => {
    _frame.value = frame.value
})

</script>
