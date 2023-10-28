<template>
	<Head>
		<title>Forgot Password</title>
	</Head>

	<div class="mx-auto bg-base-200 w-full min-h-screen" :data-theme="theme">
		<div
			class="flex flex-col items-center justify-center p-4 space-y-4 antialiased text-base-content rounded-lg"
		>
			<div
				class="w-full px-8 max-w-lg space-y-6 bg-base-100 py-16 rounded-lg mt-24"
			>
				<h1 class="mb-6 text-3xl font-bold text-center">Don't worry</h1>
				<p class="text-center mx-12">
					We are here to help you to recover your password. Enter the
					email address you used when you joined and we'll send you
					reset link
				</p>
				<form
					@submit.prevent="submit"
					class="flex flex-col items-center gap-4"
				>
					<TextInput
						label="Enter your email"
						v-model:input="email"
						v-if="
							data.status !==
							'We have emailed your password reset link.'
						"
						:error="errors?.email?.[0]"
					/>
					<Button
						:type="
							data.status ==
							'We have emailed your password reset link.'
								? 'disabled'
								: 'primary'
						"
						:loading="loading"
						>{{
							data.status ==
							"We have emailed your password reset link."
								? "Link sent"
								: "Send Reset Link"
						}}</Button
					>

					<div
						v-if="
							data.status ==
							'We have emailed your password reset link.'
						"
					>
						Please check your inbox
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script setup>
	import axios from "~~/plugins/axios";
	const $axios = axios().provide.axios;

	import { theme } from "~/data/theme";

	const data = ref({});
	const email = ref("");
	const loading = ref(false);
	const errors = ref({});

	async function submit() {
		errors.value = {};
		loading.value = true;
		try {
			const response = await $axios.post("/forgot-password", {
				email: email.value,
			});
			data.value = response.data;
		} catch (error) {
			errors.value = error.response.data.errors;
		}
		loading.value = false;
	}

	onMounted(async () => {});
</script>

<style scoped></style>
