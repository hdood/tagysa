<template>
	<div class="flex flex-col">
		<div
			class="mx-auto flex flex-col gap-2 justify-center max-w-3xl mt-4 bg-base-100 rounded-lg items-center relative p-4"
			v-for="video in videos"
			:key="video.id"
		>
			<div class="font-semibold text-base-content text-left">
				{{ video.data.title }}
			</div>
			<div class="h-full relative">
				<div class="relative w-full h-full">
					<video
						controls="controls autoplay"
						:src="video.data.url"
						alt=""
						class="rounded-md"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useProfileStore } from "~/stores/profile";

	const { user } = storeToRefs(useProfileStore());

	const props = defineProps(["media"]);

	const { media: videos } = toRefs(props);
</script>

<style scoped></style>
