<template>
    <Head>
        <title>Profile | {{user.name}}</title>
    </Head>
    <AdminLayout>
        <div class="max-w-7xl mx-auto">
            <div class=" mx-auto">
                <ProfileTabsMobile> </ProfileTabsMobile>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup >

import { storeToRefs } from 'pinia';
import AdminLayout from '~/layouts/AdminLayout.vue';
import { useUserStore } from '~/stores/user';

definePageMeta({ middleware: ['is-logged-out', "verify-email"] });

const { user } = storeToRefs(useUserStore());

</script>

<style scoped>
</style>