<template>
  <Head>
    <title>{{ user.name }}</title>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
  </Head>

  <div class="bg-base-200 min-h-screen min-w-[100vw] flex flex-col " v-if="user.id">
    <img :src="user.image" class="max-h-96" />
    <div class="px-3 border-b pb-2">
      <div class="text-2xl font-medium mt-2">
        {{ user.name }}
      </div>
      <div class="flex items-center gap-2 mt-2">
        <icon name="ep:info-filled" />
        <div>
          {{ user.designation ?? "Add your title" }}
        </div>
      </div>
      <div class="flex items-center gap-2 mt-2">
        <icon name="mdi:building" />
        <div>
          {{ user.address ?? "Add you location" }}
        </div>
      </div>
    </div>

    <div class="my-4 px-4">
      <div class="text-lg font-medium">About me</div>
      <p class=" ">
        {{ user.bio ?? "add about me section" }}
      </p>
    </div>


    <div class="w-full flex justify-center mt-4">
      <button class="btn btn-primary basis-11/12"
        @click="makeCard(user.name, user.email, '+' + user.country_code + user.phone, user.address, user.website, user.designation)">
        Contact Card
      </button>
    </div>

    <div v-for="url in user.urls" class="w-full flex justify-center mt-4">
      <a :href="url.link" target="_blank" class="btn btn-primary basis-11/12">
        <icon name="tabler:link" size="20" />
        {{ url.name }}
      </a>
    </div>

    <div class="my-4 px-4">
      <div class="text-lg font-medium">Social Icons</div>
      <div class="flex justify-center  items-center pt-2 gap-4 max-w-[15rem] mx-auto flex-wrap my-2"
        v-if="user.links.length != 0">
        <a v-for="link in user.links" rel="noopener noreferrer" target="_blank" :href="link.url" :aria-label="link.name"
          class="p-2 rounded-md ">
          <icon :name="link.icon" size="30" />
        </a>
      </div>
      <div class="text-center my-2" v-else>
        Add social icons
      </div>
    </div>

  </div>
  <div v-else>
    user not found
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/stores/profile";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

const { user } = storeToRefs(useProfileStore());
const makeCard = useVcard()


onMounted(async () => {
  const preview = useRoute().query.preview === "true";
  const landing = useRoute().query.landing === "true";

  if (landing) {

    user.value = {
      id: 1,
      name: "Tagy",
      designation: "Digital businness card",
      bio: "One Card, Endless Possibilities: Explore Your Profile!",
      image: "https://tagysa.com/light_logo.png",
      address: "Saudi Arabia",
      links: [
        {
          name: "instagram",
          icon: "skill-icons:instagram",
          url: "https://instagram.com/",
        },
        {
          name: "youtube",
          icon: "logos:youtube-icon",
          url: "https://youtube.com/",
        },
      ],
    }

    return
  }
  try {

    const response = await $axios(`/api/${useRoute().params.id}`)
    user.value = response.data.data
    if (preview) return;

    await useProfileStore().storeVisitor(user.value.id);

  } catch (error) {

    console.log(error.response)

  }
})

</script>

<style scoped></style>