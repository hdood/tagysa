<template>
  <div class="w-full flex flex-col gap-4 items-center">
    <div class="text-error">{{ errors?.maxCount }}</div>
    <progress
      class="progress progress-primary"
      :value="progressBarPercentage"
      v-if="uploading"
      max="100"
    ></progress>
    <TextInput
      v-model:input="title"
      :placeholder="props.media.name + ' title'"
      :error="errors.title"
    />

    <div class="flex items-center flex-col gap-4 w-full justify-center">
      <div class="indicator" v-if="file">
        <span
          class="indicator-item badge badge-error cursor-pointer max-w-sm"
          @click="resetFile"
          ><icon name="ph:x-bold"
        /></span>
        <div
          class="p-1 rounded-lg text-accent-content text-center badge badge-outline"
        >
          {{ fileName }}
        </div>
      </div>
      <FileInput v-model="file" v-else>
        <Button type="accent"> select {{ props.media.name }} </Button>
      </FileInput>

      <span class="italic text-error text-center">
        {{ errors?.file }}
      </span>
    </div>
    <div
      class="flex items-end flex-col gap-4 w-full relative mt-5"
      v-if="file && title != ''"
    >
      <Button type="primary" :loading="uploading" @click="uploadFile">
        Add {{ props.media.name }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import axios from "~~/plugins/axios";
import { useUserStore } from "~~/stores/user";
import { useMediaStore } from "~/stores/media";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const mediaStore = useMediaStore();
const { user } = storeToRefs(userStore);
const { media } = storeToRefs(mediaStore);
const app = useNuxtApp();
const $axios = axios(app).provide.axios;
const uploading = ref(false);
const title = ref("");
const errors = ref({ title: "" });
const file = ref(false);
const progressBarPercentage = ref(0);
const emit = defineEmits(["done"]);
const props = defineProps(["media"]);

const fileName = computed(() =>
  file.value?.name?.length > 15
    ? file.value?.name?.substring(0, 15) + "..."
    : file.value?.name
);

const onUploadProgress = (progressEvent) => {
  const { loaded, total } = progressEvent;
  let percent = Math.floor((loaded * 100) / total);
  if (percent <= 100) {
    progressBarPercentage.value = percent;
  }
};

async function uploadFile() {
  uploading.value = true;

  if (title.value == "") {
    errors.value.name = "the title field is required";
    uploading.value = false;
    return false;
  }

  if (!file.value) {
    uploading.value = false;
    errors.file = "please choose a file";
    return false;
  }

  const data = new FormData();

  data.append("media", file.value);
  data.append("user_id", user.value.id);
  data.append("data", JSON.stringify({}));
  data.append("type", props.media.type);
  data.append("title", title.value);
  data.append("order", media.value.length);
  data.append("icon", props.media.icon);
  data.append("name", props.media.name);

  try {
    await $axios.post("/api/media/file", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    mediaStore.fetchMedia(user.value.id);
    userStore.refreshFrame();
    emit("done");
  } catch (error) {
    errors.value.maxCount = error.response.data.error;
  }
  progressBarPercentage.value = 0;

  uploading.value = false;
}

watch(file, (value) => {
  errors.value = {};
  if (!value) return;
  const regex = new RegExp(fileTypes[props.media.type].regex);

  if (!regex.exec(value.name)) {
    errors.value.file =
      "please upload a file that has one of this types [ " +
      fileTypes[props.media.type].supported +
      "]";
    file.value = false;
  }
});

function resetFile() {
  errors.value = {};
  file.value = undefined;
}

const fileTypes = {
  image: {
    regex: "(\.png|\.jpg|\.jpeg|\.svg|\.webp)$",
    supported: "png, jpg, jpeg, svg, webp",
  },
  pdf: { regex: "(\.pdf)$", supported: "pdf" },
  video: { regex: "(\.mp4)", supported: "mp4" },
};
</script>

<style scoped></style>
