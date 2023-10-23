<template>
	<div class="flex justify-center">
		<iframe
			:src="url + '/embed'"
			class="w-72 rounded-lg overflow-hidden"
			height="580"
			style="border: none; overflow: hidden"
			scrolling="no"
			frameborder="0"
			allowfullscreen="true"
			allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
		></iframe>
	</div>
</template>

<script setup>
	const props = defineProps(["media"]);
	const data = props.media.data;

	const withoutTrailingSlash = computed(() => {
		if (data?.url?.slice(-1) == "/") return data?.url?.slice(0, -1);
		return data.url;
	});

	const url = computed(() => {
		const regex = /(p|reel)\/([a-zA-Z0-9-_]*)/;

		const match = data.url.match(regex);
		const postId = match?.[2];
		return `https://www.instagram.com/p/${postId}`;
	});
</script>
