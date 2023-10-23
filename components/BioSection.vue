<template>
	<div id="ProfileSection" class="w-full bg-base-200 rounded-lg">
		<div class="w-full rounded-3xl p-6">
			<div>
				<TextInput
					class="mt-4"
					placeholder="Full Name"
					v-model:input="fullName"
					:rounded="true"
					label="Full Name"
					inputType="text"
					:error="errors && errors?.full_name ? errors?.full_name[0] : ''" />
			</div>

			<div>
				<TextInput
					class="mt-4"
					placeholder="Designation"
					v-model:input="designation"
					:rounded="true"
					label="Designation"
					inputType="text"
					:error="errors && errors?.designation ? errors?.designation[0] : ''" />
			</div>

			<label for="bio" class="flex flex-col mt-5 gap-1">
				<span class="text-sm font-medium">About me</span>

				<textarea
					class="textarea textarea-primary text-sm w-full py-3.5 px-3"
					placeholder="About me"
					v-model="bio"
					rows="4"
					maxlength="300"
					id="bio"></textarea>
			</label>
			<div class="flex items-center justify-end text-[#676B5F] text-[13px]">{{ bioLengthComputed }}/300</div>

			<div class="w-full">
				<Button
					type="primary"
					@click="updateProfileInfos"
					:loading="savingBioLoading"
					class="p-2 w-44 block mx-auto">
					Save Bio
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from '~~/plugins/axios';
	import { useUserStore } from '~~/stores/user';
	import { useNotificationsStore } from '~/stores/notifications';
	import { storeToRefs } from 'pinia';
	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);

	const { successNotification } = useNotificationsStore();

	const app = useNuxtApp();
	const $axios = axios(app).provide.axios;

	const savingBioLoading = ref(false);

	const loading = ref(false);

	const name = ref('');
	const tempName = ref('');
	const bio = ref('');
	const designation = ref('');
	const fullName = ref('');

	const editing = ref(false);

	const errors = ref({});

	onMounted(() => {
		syncState();
	});

	function syncState() {
		name.value = user.value.name;
		tempName.value = name.value;
		bio.value = user.value.bio;
		designation.value = user.value.designation;
		fullName.value = user.value.full_name;
	}

	const updateProfileInfos = async () => {
		errors.value = [];
		// if the entered name is the same as the current name we don't have update it
		if (tempName.value == name.value && editing.value) {
			loading.value = false;
			editing.value = false;

			return;
		}

		if (tempName.value.includes(' ') && editing.value) {
			loading.value = false;
			errors.value.name = ['username must contain only letters and _'];
			return;
		}
		try {
			loading.value = true;
			savingBioLoading.value = true;
			await $axios.patch(`/api/users/${user.value.id}`, {
				name: tempName.value,
				bio: bio.value,
				full_name: fullName.value,
				designation: designation.value,
			});

			await userStore.getUser();
			name.value = user.value.name;

			successNotification('bio content updated successfully');

			userStore.refreshFrame();
			editing.value = false;
		} catch (error) {
			errors.value = error.response.data?.errors;
		}
		loading.value = false;
		savingBioLoading.value = false;
	};

	const bioLengthComputed = computed(() => {
		return !bio.value ? 0 : bio.value.length;
	});
</script>

<style scoped></style>
