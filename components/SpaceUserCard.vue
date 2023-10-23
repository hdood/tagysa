<template>
	<div class="card w-72 bg-base-200 shadow-md text-base-content scale-90">
		<div class="card-body">
			<div class="card-title">
				<div class="flex gap-3 items-center">
					<div class="avatar">
						<div class="w-16 rounded-full">
							<img
								:src="user.image"
								alt="Tailwind-CSS-Avatar-component"
							/>
						</div>
					</div>
					<div>
						<div class="font-medium">
							{{ user.name }}
						</div>
						<div class="text-sm opacity-50">
							{{ user.designation }}
						</div>
					</div>
				</div>
			</div>
			<div class="card-actions justify-between mt-3">
				<NuxtLink :to="'/' + user.name">
					<Button type="primary"> Profile </Button>
				</NuxtLink>
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
		<ConfirmModal
			:show="showDeleteModal"
			title="Delete User"
			body="Are you sure you want to delete this user"
			type="danger"
			positive="Delete"
			@close="showDeleteModal = false"
			@confirm="deleteUser"
		/>
	</div>
</template>

<script setup>
	import { useSpacesStore } from "~/stores/spaces";
	const { detachUser, fetchAll } = useSpacesStore();

	const props = defineProps(["user"]);
	const { user } = toRefs(props);

	const showDeleteModal = ref(false);

	async function deleteUser() {
		await detachUser(user.value.pivot.space_id, user.value.name);
		await fetchAll();
	}
</script>

<style scoped></style>
