<template>
	<div class="w-full">
		<Button
			type="primary"
			@click="showModal = true"
			class="h-10 w-full px-8 mx-auto"
		>
			Add Media
		</Button>

		<div
			class="text-2xl opacity-75 font-medium mt-5"
			v-if="medias.length != 0"
		>
			Your media
		</div>
		<div
			v-else
			class="mt-8 mx-2 text-xl font-medium w-full text-center"
		>
			You don't have any media
		</div>

		<draggable
			v-model="mediaStore.media"
			:item-key="'nothing'"
			handle=".handle"
			ghost-class="brightness-50"
			tag="div"
			:component-data="{ class: 'flex flex-col w-full gap-5 mt-10' }"
			@end="onEnd"
		>
			<template #item="{ element }">
				<component
					:is="getComponent(element.type)"
					:media="element"
				/>
			</template>
		</draggable>

		<MediaModal
			:show="showModal"
			@close="showModal = false"
		/>
	</div>
</template>

<script setup>
	import draggable from "vuedraggable";
	import Embedding from "./mediaInput/Embedding.vue";
	import File from "~/components/mediaInput/File.vue";
	import mediaTypes from "~/data/media";
	import { useMediaStore } from "~/stores/media";
	import { useUserStore } from "~~/stores/user";
	import { storeToRefs } from "pinia";
	const userStore = useUserStore();
	const mediaStore = useMediaStore();

	const { user } = storeToRefs(userStore);
	const { media: medias } = storeToRefs(mediaStore);
	const selectedMedia = ref(mediaTypes[0]);
	const showModal = ref(false);

	onMounted(async () => {
		await mediaStore.fetchMedia(user.value.id);
	});

	async function onEnd() {
		await mediaStore.reorder();
	}
	const getComponent = (type) =>
		mediaTypes.find((media) => media.type == type).component;

	const mediaInputs = {
		file: {
			name: "file",
			component: File,
		},
		embedding: {
			name: "embedding",
			component: Embedding,
		},
	};
</script>

<style scoped></style>
