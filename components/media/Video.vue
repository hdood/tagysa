<template>
	<Media
		@delete="mediaStore.deleteFileMedia(props.media.id)"
		:media="props.media"
	>
		<div class="flex flex-col gap-2">
			<div class="text-xl font-medium">
				{{ data.title }}
			</div>
			<video
				controls="controls autoplay"
				:src="data.url"
				alt=""
			/>
		</div>
	</Media>
</template>

<script setup>
	import { useMediaStore } from "~/stores/media";
	const mediaStore = useMediaStore();
	const props = defineProps(["media"]);
	const data = JSON.parse(props.media.data);
</script>
