<template>
	<Head>
		<title>Reset Password</title>
	</Head>

	<div class="mx-auto bg-base-200 w-full min-h-screen">
		<div
			class="flex flex-col items-center justify-center p-4 space-y-4 antialiased text-base-content rounded-lg"
		>
			<div
				class="w-full px-8 max-w-lg space-y-6 bg-base-100 py-16 rounded-lg mt-24"
			>
				<h1 class="mb-6 text-3xl font-bold text-center">
					Change your password
				</h1>
				<p class="text-center mx-12">Please enter your new password</p>
				<form
					@submit.prevent="submit"
					class="flex flex-col items-center gap-4"
				>
					<TextInput
						label="New Password"
						v-model:input="password"
						:error="errors?.password?.[0]"
						inputType="password"
					/>
					<TextInput
						label="New Password Confirmation"
						v-model:input="passwordConfirmation"
						:error="errors?.password_confirmation?.[0]"
						inputType="password"
					/>
					<Button
						type="primary"
						:loading="loading"
					>
						Change Password
					</Button>
				</form>
			</div>
		</div>
	</div>
</template>
<script setup>
	import axios from "~~/plugins/axios";
	const $axios = axios().provide.axios;
	import { useNotificationsStore } from "~/stores/notifications";

	const notificationsStore = useNotificationsStore();

	const { successNotification, errorNotification } = notificationsStore;
	const errors = ref({});
	const loading = ref(false);

	const password = ref("");
	const passwordConfirmation = ref("");

	async function submit() {
		errors.value = {};
		loading.value = true;
		try {
			await $axios.post("/reset-password", {
				password: password.value,
				password_confirmation: passwordConfirmation.value,
				email: useRoute().query.email,
				token: useRoute().params.token,
			});
			successNotification("Password reset was successfully");
			useRouter().push("/login");
		} catch (error) {
			errorNotification("Failed to reset password");
			errors.value = error.response.data.errors;
		}
		loading.value = false;
	}
</script>

<style scoped></style>
