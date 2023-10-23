<template>
    <div>
        
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/stores/profile";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

const {user} = storeToRefs(useProfileStore()); 
const notFound = ref(false)


onMounted(async () => {
    try {
        const response = await $axios(`/api/${useRoute().params.id}`)
        user.value = response.data.data
        useRouter().push({ name : "name", params : { name : user.value.name } })
    } catch (error) {
        notFound.value = true
    }
})

</script>

<style scoped>

</style>