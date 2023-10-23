<template>
	<div class="flex flex-col">
		<div
			class="mx-auto flex flex-col gap-2 justify-center max-w-3xl mt-4 bg-base-100 rounded-lg items-center relative p-4"
			v-for="photo in photos"
			:key="photo.id"
		>
			<div class="font-semibold text-base-content text-left">
				{{ photo.data.title }}
			</div>
			<div class="h-full relative">
				<div class="relative w-full h-full">
					<img
						:src="photo.data.url"
						alt="saman"
						class="rounded-lg w-60 h-60 object-cover"
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

	const { media: photos } = toRefs(props);
</script>

<style scoped></style>
