<template>
	<Media
		@delete="mediaStore.deleteMedia(props.media.id)"
		:media="props.media"
	>
		<div class="w-full flex justify-center">
			<iframe
				:src="`${withoutTrailingSlash}/embed`"
				class="w-full"
				height="600"
				style="border: none; overflow: hidden"
				scrolling="no"
				frameborder="0"
				allowfullscreen="true"
				allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
			></iframe>
		</div>
	</Media>
</template>

<script setup>
	import { useMediaStore } from "~/stores/media";
	const mediaStore = useMediaStore();

	const props = defineProps(["media"]);

	const data = JSON.parse(props.media.data);

	async function delateMedia() {
		await mediaStore.deleteMedia(props.media.id);
		await mediaStore.fetchMedia();
	}

	const withoutTrailingSlash = computed(() => {
		if (data?.url?.slice(-1) == "/") return data?.url?.slice(0, -1);
		return data.url;
	});
</script>

<style lang="scss"></style>
