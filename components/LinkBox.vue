<template>
	<div class="w-full rounded-xl px-2 flex flex-col bg-base-300 p-2 shadow text-base-content">
		<ConfirmModal :show="showDeleteModal" title="Delete Link" body="Are you sure you want to delete this link"
			type="danger" positive="Delete" @close="showDeleteModal = false" @confirm="deleteLink" />
		<div class="flex items-center gap-3 justify-between">
			<div class="flex items-center gap-5">
				<icon name="mdi:drag" size="35" class="cursor-move handle" />
				<div class="flex gap-2 items-center">
					<icon size="40" :name="link.icon" />
					<div>
						<div>
							{{ link.displayText }}
						</div>
						<div class="text-xs">
							{{ link.name }}
						</div>
					</div>
				</div>
			</div>

			<Button type="danger" class="px-2 h-10 justify-self-end" @click="showDeleteModal = true">
				<div class="flex gap-2 items-center">
					<icon size="25" name="ic:round-delete" />
				</div>
			</Button>
		</div>


	</div>
</template>

<script setup>
import { useUserStore } from "~~/stores/user";
import { useLinksStore } from "~/stores/links";
const userStore = useUserStore();
const linksStore = useLinksStore();

const showDeleteModal = ref(false);

const props = defineProps({
	link: Object,
});
const { link } = toRefs(props);

const emit = defineEmits(["updatedInput"]);

async function deleteLink() {
	try {
		await linksStore.deleteLink(link.value.id);
		await linksStore.getAllLinks();
		userStore.refreshFrame();
	} catch (error) {
		console.log(error);
	}
}
</script>
