<template>
	<tr>
		<td>
			<div class="flex items-center space-x-3">
				<div class="avatar">
					<div class="mask mask-squircle w-12 h-12">
						<img
							:src="user.image"
							alt="Avatar Tailwind CSS Component"
						/>
					</div>
				</div>
				<div>
					<div class="font-bold">{{ user.name }}</div>
					<div class="text-sm opacity-50">{{ user.designation }}</div>
				</div>
			</div>
		</td>
		<td>
			{{ user.bio ? user.bio : '/' }}
		</td>
		<td>{{ user.email }}</td>
		<th>
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
		</th>

		<ConfirmModal
			:show="showDeleteModal"
			title="Delete User"
			body="Are you sure you want to delete this user"
			type="danger"
			positive="Delete"
			@close="showDeleteModal = false"
			@confirm="deleteUser"
		/>
	</tr>
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
