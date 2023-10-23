<template>
	<Head><title>My space</title></Head>

	<div
		class="p-10 w-full grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4"
	>
		<CreateSpaceCard />
		<SpaceCard
			v-for="space in spaces"
			:space="space"
			:key="space.id"
		/>
	</div>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useNotificationsStore } from "~/stores/notifications";
	import { useSpacesStore } from "~/stores/spaces";
	const spacesStore = useSpacesStore();
	const { spaces } = storeToRefs(spacesStore);
	const { errorNotification } = useNotificationsStore();

	onMounted(async () => {
		try {
			await spacesStore.fetchAll();
		} catch (error) {
			errorNotification("failed to fetch spaces");
		}
	});
</script>

<style scoped></style>
