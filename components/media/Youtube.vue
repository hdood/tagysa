<template>
	<Media
		@delete="mediaStore.deleteMedia(props.media.id)"
		:media="props.media"
	>
		<iframe
			class="w-full"
			height="315"
			:src="`https://www.youtube.com/embed/${extractYouTubeVideoId}`"
		>
		</iframe>
	</Media>
</template>

<script setup>
	import { useMediaStore } from "~/stores/media";
	const mediaStore = useMediaStore();

	const props = defineProps(["media"]);
	const data = JSON.parse(props.media.data);

	const extractYouTubeVideoId = computed(() => {
		const regExp = /v=(.*)&/;
		const match = data.url.match(regExp);
		if (match && match[1]) {
			return match[1];
		} else {
			return null;
		}
	});

	onMounted(() => console.log(extractYouTubeVideoId.value));
</script>

<style scoped></style>
