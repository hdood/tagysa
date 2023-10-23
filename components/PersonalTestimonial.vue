<template>
	<div class="flex justify-center relative min-w-fit">
		<div
			class="max-w-fit p-4 bordered card rounded-lg flex flex-col shadow-lg gap-3 bg-base-100"
		>
			<div
				class="flex w-full justify-between items-center max-w-fit gap-20"
			>
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
						<div class="flex">
							<div
								v-for="i in 5"
								class="mask mask-star bg-orange-400 h-4 w-4"
								:class="[
									i > testimonial.rating ? 'opacity-50' : '',
								]"
								:key="i"
							/>
						</div>
					</div>
				</div>
				<Button
					type="danger"
					class="px-2 h-10 hidden lg:block"
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
			<div
				class="text-gray-600 text-left text-sm break-words h-40 flex w-72"
			>
				{{ testimonial.content }}
			</div>
			<div class="w-full flex justify-end lg:hidden">
				<Button
					type="danger"
					class="px-2 h-10"
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
	import { useTestimonialsStore } from "~/stores/testimonials";

	const testimonialsStore = useTestimonialsStore();
	const props = defineProps(["testimonial"]);
	const { testimonial } = toRefs(props);
	const showDeleteModal = ref(false);

	async function destroy() {
		await testimonialsStore.destroy(testimonial.value.id);
		await testimonialsStore.fetchAll();
	}
</script>

<style></style>
