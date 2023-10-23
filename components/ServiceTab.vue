<template>
	<div class="w-full flex flex-col items-center">
		<Button
			class="h-10 w-full px-8 mx-auto"
			type="primary"
			@click="showAddModal = true"
			>Add Service</Button
		>

		<draggable
			v-model="services"
			:component-data="{ class: 'w-full mt-8' }"
			tag="div"
			:item-key="'nothing'"
			handle=".handle"
			ghost-class="bg-blue-400"
			@end="onEnd"
		>
			<template #item="{ element }">
				<Service
					:service="element"
					class="mt-3"
				/>
			</template>
		</draggable>
		<div
			class="w-full mt-8 text-center text-2xl text-gray-700"
			v-if="services.length == 0"
		>
			You don't have any services
		</div>
	</div>
	<ServiceModal
		:show="showAddModal"
		@close="showAddModal = false"
	/>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useServicesStore } from "~/stores/services";
	import draggable from "vuedraggable";

	const servicesStore = useServicesStore();
	const { services } = storeToRefs(servicesStore);
	const { fetchAll, reorder } = servicesStore;

	async function onEnd() {
		await reorder();
	}

	onMounted(async () => {
		await fetchAll();
	});
	const showAddModal = ref(false);
</script>

<style></style>
