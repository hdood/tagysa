<template>
	<div class="flex flex-col gap-3">
		<textInput
			v-model:input="url"
			:placeholder="`${props.media?.name} link`"
			:error="errors.url"
		/>
		<textInput
			v-model:input="title"
			:placeholder="`${props.media?.name} Title`"
			:error="errors.title"
		/>

		<div class="flex justify-end gap-4 w-full relative mt-5">
			<Button
				type="primary"
				class="px-2 h-10"
				@click="save"
				:loading="loading"
			>
				Add Media</Button
			>
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

	const props = defineProps(["media"]);
	const errors = ref({});
	const url = ref("");
	const title = ref("");
	const loading = ref(false);
	const emit = defineEmits(["done"]);

	async function save() {
		loading.value = true;
		if (url.value == "") {
			errors.value.url = "url cannot be empty";
			loading.value = false;
			return false;
		}

		if (title.value == "") {
			errors.value.title = "title cannot be empty";
			loading.value = false;
			return false;
		}
		try {
			await $axios.post("/api/media/embedded", {
				user_id: user.value.id,
				type: props.media?.type,
				data: JSON.stringify({
					url: url.value,
					title: title.value,
				}),
				order: media.value.length,
				name: props.media.name,
				icon: props.media.icon,
			});
			await mediaStore.fetchMedia(user.value.id);
			userStore.refreshFrame();
			emit("done");
		} catch (error) {
			console.log(error);
		}
		loading.value = false;
	}
</script>

<style scoped></style>
