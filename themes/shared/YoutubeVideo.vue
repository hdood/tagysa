<template>
	<div>
		<iframe
			class="w-full h-40 rounded-md overflow-hidden"
			height="315"
			:src="`https://www.youtube.com/embed/${extractYouTubeVideoId}`"
		>
		</iframe>
	</div>
</template>

<script setup>
	const props = defineProps(["media"]);
	const data = props.media.data;

	const extractYouTubeVideoId = computed(() => {
		const regExp = /v=([a-zA-Z0-9]*)&?/;
		const match = data.url.match(regExp);
		if (match && match[1]) {
			return match[1];
		} else {
			return null;
		}
	});
</script>

<style scoped></style>
