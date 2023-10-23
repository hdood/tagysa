<template>
	<iframe
		:src="`https://www.facebook.com/plugins/post.php?href=${withoutTrailingSlash}&show_text=true&width=100`"
		height="auto"
		style="border: none; overflow: hidden"
		scrolling="no"
		frameborder="0"
		allowfullscreen="true"
		allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
	></iframe>
</template>

<script setup>
	const props = defineProps(["media"]);

	const data = props.media.data;

	const withoutTrailingSlash = computed(() => {
		if (data?.url?.slice(-1) == "/") return data?.url?.slice(0, -1);
		return data.url;
	});
</script>
