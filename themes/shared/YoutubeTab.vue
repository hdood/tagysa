<template>
	<div class="flex flex-col">
		<div
			class="mx-auto flex flex-col gap-2 justify-center max-w-3xl mt-4 bg-base-100 rounded-lg items-center relative p-4"
			v-for="video in videos"
			:key="video.id"
		>
			<div class="h-full relative">
				<div class="relative w-full max-h-xs">
					<YoutubeVideo :media="video" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import YoutubeVideo from "./YoutubeVideo.vue";
	const props = defineProps(["media"]);
	const { media: videos } = toRefs(props);
</script>

<style scoped></style>
