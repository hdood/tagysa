<template>
	<div class="card min-w-fit text-base-content bg-base-200 border shadow-lg" :data-theme="user.theme">
		<div class="card-body">
			<TextInput v-model:input="tempName" label="Name" v-if="editing" :error="error" />
			<h2 class="card-title" v-else>
				{{ space.name }}
			</h2>
			<div class="avatar-group -space-x-3">
				<div class="avatar" v-for="user in firstThree">
					<div class="w-8">
						<img :src="user.image" />
					</div>
				</div>
				<div class="avatar placeholder" v-if="space.users.length != 1">
					<div class="w-8 bg-neutral-focus text-neutral-content test-sm">
						<span> +{{ space.users.length }} </span>
					</div>
				</div>
			</div>
			<div class="card-actions justify-between mt-3">
				<div class="flex gap-3">
					<Button
						type="danger"
						class="px-2 h-10 justify-self-end"
						@click="showDeleteModal = true"
						v-if="!editing && !space.default"
					>
						<div class="flex gap-2 items-center">
							<icon size="25" name="ic:round-delete" />
						</div>
					</Button>
					<Button
						:type="editing ? 'success' : 'accent'"
						class="px-2 h-10 justify-self-end"
						@click="updateSpace"
					>
						<div class="flex gap-2 items-center">
							<icon v-if="editing" size="25" name="fluent:checkmark-12-filled" />
							<icon v-else size="25" name="material-symbols:edit" />
						</div>
					</Button>
					<Button type="danger" v-if="editing" class="px-2 h-10 justify-self-end" @click="editing = false">
						<div class="flex gap-2 items-center">
							<icon v-if="editing" size="25" name="ph:x-bold" />
							<icon v-else size="25" name="material-symbols:edit" />
						</div>
					</Button>
					<Button
						type="primary"
						class="px-2 h-10 justify-self-end"
						@click="showAddModal = true"
						v-if="!editing"
					>
						<div class="flex gap-2 items-center">
							<icon size="25" name="mdi:user-add" />
						</div>
					</Button>
				</div>
				<NuxtLink :to="`/admin/space/${space.name}`">
					<Button type="primary" class="px-4 h-10">View</Button>
				</NuxtLink>
			</div>
		</div>

		<ConfirmModal
			:show="showDeleteModal"
			title="Delete Space"
			body="Are you sure you want to delete this space"
			type="danger"
			positive="Delete"
			@close="showDeleteModal = false"
			@confirm="destroySpace"
		/>
		<AddSpaceUserModal :show="showAddModal" @close="showAddModal = false" @add="addUser" />
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import { useSpacesStore } from '~/stores/spaces';
	import { useUserStore } from '~/stores/user';
	const props = defineProps(['space']);
	const user = storeToRefs(useUserStore());
	const { space } = toRefs(props);
	const { destroy, fetchAll, attachUser, update } = useSpacesStore();
	const { spaces } = storeToRefs(useSpacesStore());
	const showDeleteModal = ref(false);
	const showAddModal = ref(false);

	const tempName = ref('');
	const editing = ref(false);
	const loading = ref(false);
	const error = ref('');

	async function destroySpace() {
		await destroy(space.value.id);
		await fetchAll();
	}

	async function addUser(name) {
		await attachUser(space.value.id, name);
		await fetchAll();
	}

	const firstThree = computed(() => space.value.users.slice(0, 3));

	async function updateSpace() {
		error.value = '';
		if (!editing.value) {
			editing.value = true;
			return;
		}

		if (tempName.value == '') {
			error.value = 'space name cannot be empty';
			return;
		}
		if (tempName.value == space.value.name) {
			editing.value = false;
			return;
		}

		const existingSpaceName = spaces.value.find((space) => space.name == tempName.value);

		if (existingSpaceName) {
			error.value = 'space already existing';
			return;
		}
		loading.value = true;
		await update({
			id: space.value.id,
			name: tempName.value,
		});
		await fetchAll();
		loading.value = false;
		editing.value = false;
	}
</script>

<style scoped></style>
