<template>
	<Media
		@delete="mediaStore.deleteMedia(props.media.id)"
		:media="props.media"
	>
		<iframe
			:src="`https://www.facebook.com/plugins/post.php?href=${withoutTrailingSlash}&show_text=true&width=500`"
			height="auto"
			style="border: none; overflow: hidden"
			scrolling="no"
			frameborder="0"
			allowfullscreen="true"
			allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
		></iframe>
	</Media>
</template>

<script setup>
	import { useMediaStore } from "~/stores/media";
	const mediaStore = useMediaStore();

	const props = defineProps(["media"]);

	const data = JSON.parse(props.media.data);

	const withoutTrailingSlash = computed(() => {
		if (data?.url?.slice(-1) == "/") return data?.url?.slice(0, -1);
		return data.url;
	});
</script>

<style scoped></style>
