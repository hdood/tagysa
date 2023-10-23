<template>
	<div class="h-[20rem] mb-20 rounded-lg relative">
		<img
			:src="user.cover_image"
			alt=""
			class="absolute top-0 left-0 w-full h-full rounded-lg hover:brightness-75 transition-all cursor-pointer"
			@click="openCoverCropper = true"
			srcset=""
		/>

		<div
			class="avatar absolute -bottom-16 left-6 cursor-pointer"
			@click="openCropper = true"
		>
			<div
				class="w-40 rounded-full hover:brightness-50 transition-all ring ring-primary ring-offset-base-100 ring-offset-2"
			>
				<img :src="user.image" />
			</div>
		</div>

		<CropperModal
			:show="openCropper"
			@data="image = $event"
			@close="openCropper = false"
		/>
		<CropperModal
			:show="openCoverCropper"
			@data="cover = $event"
			@close="openCoverCropper = false"
		/>
	</div>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);

	const openCropper = ref(false);
	const openCoverCropper = ref(false);
	const image = ref({});
	const cover = ref({});

	const updateUserImage = async () => {
		try {
			await userStore.updateUserImage(image.value);
			await userStore.getUser();
			setTimeout(() => (openCropper.value = false), 300);
		} catch (error) {
			openCropper.value = false;
			alert(error);
		}
	};
	const updateUserCoverImage = async () => {
		try {
			await userStore.updateUserCoverImage(cover.value);
			await userStore.getUser();
			setTimeout(() => (openCoverCropper.value = false), 300);
		} catch (error) {
			openCoverCropper.value = false;
			alert(error);
		}
	};

	watch(
		() => image.value,
		async () => await updateUserImage()
	);

	watch(
		() => cover.value,
		async () => await updateUserCoverImage()
	);
</script>

<style scoped></style>
