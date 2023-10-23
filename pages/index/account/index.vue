<template>
	<div>
		<h2 class="text-2xl font-medium text-base-content">Change password</h2>

		<form @submit.prevent="submit">
			<TextInput
				v-model:input="currentPassword"
				label="Current password"
				inputType="password"
			/>
			<TextInput
				v-model:input="newPassword"
				label="New password"
				inputType="password"
				:error="errors?.newPassword?.[0]"
			/>
			<TextInput
				v-model:input="cPassword"
				label="New password confirmation"
				:error="errors?.cPassword?.[0]"
				inputType="password"
			/>
			<Button
				type="primary"
				class="mt-3"
				:loading="passwordLoading"
				>Update password</Button
			>
		</form>
	</div>
	<div class="mt-4">
		<h2 class="text-2xl font-medium text-base-content">Delete account</h2>
		<form @submit.prevent="destroy">
			<TextInput
				v-model:input="password"
				inputType="password"
				label="Password"
			/>
			<Button
				type="danger"
				class="mt-2"
				:loading="deleteLoading"
				>Delete Account</Button
			>
		</form>
	</div>
</template>

<script setup>
	import { useAuthStore } from "~/stores/auth";

	const { changePassword, deleteAccount } = useAuthStore();
	const currentPassword = ref("");
	const newPassword = ref("");
	const cPassword = ref("");
	const password = ref("");

	const passwordLoading = ref(false);
	const deleteLoading = ref(false);

	const errors = ref({});

	async function submit() {
		if (newPassword.value.length < 8) {
			errors.value = {
				newPassword: [
					"password length must be longer than 8 characters",
				],
			};
			return;
		}

		if (newPassword.value != cPassword.value) {
			errors.value = {
				cPassword: [
					"password confirmation is not the same as the new password",
				],
			};
			return;
		}

		passwordLoading.value = true;
		await changePassword(
			currentPassword.value,
			newPassword.value,
			cPassword.value
		);
		passwordLoading.value = false;
	}

	async function destroy() {
		deleteLoading.value = true;
		const result = await deleteAccount(password.value);

		if (result) useRouter().push("/");
		deleteLoading.value = false;
	}
</script>
