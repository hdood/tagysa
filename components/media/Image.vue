<template>
	<Media
		@delete="mediaStore.deleteFileMedia(props.media.id)"
		:media="props.media"
	>
		<img
			:src="data.url"
			alt=""
		/>
	</Media>
</template>

<script setup>
	import { useMediaStore } from "~/stores/media";
	const mediaStore = useMediaStore();

	const props = defineProps(["media"]);

	const data = JSON.parse(props.media.data);
</script>

<style scoped></style>
