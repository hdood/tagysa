<template>
	<div class="w-full">
		<Disclosure>
			<div
				class="bg-base-300 w-full rounded-lg min-h-min p-2 flex items-center justify-between"
			>
				<div class="flex gap-3 items-center">
					<icon
						name="mdi:drag"
						size="35"
						class="cursor-move handle"
					/>
					<div class="flex gap-3 items-center text-base-content">
						<icon
							size="40"
							:name="props.media.icon"
							class="text-indigo-600"
						/>
						<div>
							<div>
								{{ data?.title }}
							</div>
							<div class="text-xs">
								{{ props.media.name }}
							</div>
						</div>
					</div>
				</div>
				<div class="flex gap-3 items-center">
					<DisclosureButton>
						<Button
							type="info"
							class="px-2 h-10 justify-self-end"
						>
							<div class="flex gap-2 items-center">
								<icon
									size="25"
									name="icon-park-solid:preview-open"
								/>
							</div>
						</Button>
					</DisclosureButton>
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
			</div>
			<transition
				enter-active-class="transition-all"
				enter-from-class="opacity-0 h-0"
				leave-active-class="transition-all"
				leave-to-class="opacity-0 h-0"
			>
				<DisclosurePanel
					class="text-base-content h-full mt-2 p-2 rounded-xl"
				>
					<slot />
				</DisclosurePanel>
			</transition>
		</Disclosure>
		<ConfirmModal
			:show="showDeleteModal"
			title="Delete Media"
			body="Are you sure you want to delete this media"
			type="danger"
			positive="Delete"
			@close="showDeleteModal = false"
			@confirm="destroy"
		/>
	</div>
</template>

<script setup>
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
	} from "@headlessui/vue";
	import { storeToRefs } from "pinia";

	import { useMediaStore } from "~/stores/media";
	import { useUserStore } from "~/stores/user";
	const { fetchMedia, deleteMedia } = useMediaStore();
	const { user } = storeToRefs(useUserStore());
	const props = defineProps(["media"]);
	const showDeleteModal = ref(false);
	const emit = defineEmits(["delete"]);

	const data = JSON.parse(props.media.data);

	async function destroy() {
		emit("delete");
		await fetchMedia(user.value.id);
		await useUserStore().getUser();
	}
</script>

<style scoped></style>
