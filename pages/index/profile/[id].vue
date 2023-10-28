<template>
    <Head>
        <title>Profile | {{user.name}}</title>
    </Head>
    <AdminLayout>
        <div class="max-w-7xl mx-auto">
            <div class=" mx-auto">
                <div class="lg:px-10 ">
                    <icon @click="back()" v-if="locale != 'ar' " class="cursor-pointer" name="material-symbols:arrow-back" size="40" />
                    <icon @click="back()" v-else class="cursor-pointer" name="material-symbols:arrow-forward" size="40" />
                </div>
                <ProfileTabsMobile > </ProfileTabsMobile>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup >

import { storeToRefs } from 'pinia';
import AdminLayout from '~/layouts/AdminLayout.vue';
import { useProfileStore } from '~/stores/profile';
import { useUserStore } from '~/stores/user';
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;


definePageMeta({ middleware: ['is-logged-out', "verify-email"] });
const { locale } = useI18n();


const { activeProfile : user } = storeToRefs(useProfileStore()); 

function back(){

    useRouter().go(-1)
    
}

onMounted(async () => {

    try {

        useProfileStore().fetchProfile(useRoute().params.id)
    
    } catch (error) {
        console.log(error)
    }

})

</script>

<style scoped>
</style>