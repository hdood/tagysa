<template>
	<div
		class="flex flex-col w-72 border rounded-lg p-5 items-start gap-5 relative"
	>
		<div class="flex w-full justify-end">
			<Button
				type="danger"
				class="px-2 h-10 justify-self-end"
				@click="showDeleteModal = true"
			>
				<div class="flex gap-2 items-center">
					<icon
						size="25"
						name="ic:round-delete"
					/>
				</div>
			</Button>
		</div>
		<div class="text-gray-600 text-center w-full break-words h-40">
			{{ testimonial.content }}
		</div>
		<div class="flex gap-3 items-center">
			<div>
				<img
					class="w-14 h-14 rounded-full"
					:src="testimonial.image"
					alt=""
				/>
			</div>
			<div>
				<div class="font-medium">
					{{ testimonial.userName }}
				</div>
			</div>
		</div>
		<ConfirmModal
			:show="showDeleteModal"
			title="Delete Testimonial"
			body="Are you sure you want to delete this testimonial"
			type="danger"
			positive="Delete"
			@close="showDeleteModal = false"
			@confirm="destroy"
		/>
	</div>
</template>

<script setup>
	import { useServicesStore } from "~/stores/services";
	const servicesStore = useServicesStore();
	const props = defineProps(["testimonial"]);
	const { testimonial } = toRefs(props);
	const showDeleteModal = ref(false);

	async function destroy() {
		await servicesStore.destroyTestimonial(testimonial.value.id);
		await servicesStore.fetchAll();
	}
</script>

<style></style>
