<template>
	<Head>
		<title>Login</title>
	</Head>

	<div class="flex flex-col items-center justify-center gap-4 min-h-screen p-3 bg-base-200">
		<div>
			<Logo class="w-20 h-20" />
		</div>
		<div class="bg-base-100 flex rounded-xl shadow-md overflow-hidden">
			<div class="flex flex-col items-center justify-center w-full gap-6 py-3 px-7 lg:min-w-fit lg:w-[30rem]">
				<div class="space-y-3">
					<div class="text-2xl font-medium text-center text-primary">Login</div>
				</div>


				<form @submit.prevent="login">
					<div class="">
						<TextInput
							label="Email"
							v-model:input="email"
							placeholder="Email eg: test@test.com"
							:error="errors?.email?.[0]"
						/>

						<div class="form-control w-full max-w-xs">
							<label class="label">
								<span class="label-text">Password</span>
							</label>
							<input
								type="password"
								v-model="password"
								placeholder="Password"
								inputType="email"
								class="input input-bordered input-primary w-full max-w-xs"
							/>
							<label class="label">
								<span class="text-error">
									{{ errors?.password?.[0] }}
								</span>
								<span class="label-text-alt link-hover"
									><NuxtLink to="/forgot-password">Forgot password?</NuxtLink></span
								>
							</label>
						</div>
					</div>
					<Button :type="valid ? 'primary' : 'disabled'" :loading="loading" class="mt-3 w-full"
						>Log in</Button
					>
				</form>

				
				<div class="w-full text-center">Or</div>
				<div id="buttonEL" ref="buttonEl"></div>


				<div class="text-sm text-right">
					<RouterLink to="/register" class=" text-base underline">Create account</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { initGoogleProvider } from '~/services/googleProvider';
	import { useUserStore } from '~~/stores/user';
	import { useSocialStore } from '~~/stores/social';
	import { useAuthStore } from '~/stores/auth';
	import { useLinksStore } from '~/stores/links';
	definePageMeta({ middleware: 'is-logged-in' });
	const userStore = useUserStore();
	const socialStore = useSocialStore();
	const authStore = useAuthStore();
	const linksStore = useLinksStore();

	const buttonEl = ref(null);

	const router = useRouter();

	const email = ref('');
	const password = ref('');
	const errors = ref({ email: '', password: '' });
	const loading = ref(false);

	onMounted(async () => {
		const googleProvider = await initGoogleProvider();

		const renderButton = googleProvider.useRenderButton({
			useOneTap: true,
			element: buttonEl.value,
			onError: () => console.error('Failed to render button'),
			onSuccess: async (res) => {
				loading.value = true;
				if (await socialStore.googleLogin(res)) {
					await useRouter().push('/admin');
				} else {
					socialStore.error = "You're not signed up";
					await useRouter().push('/register');
				}
				loading.value = true;

				return true;
			},
		});
		renderButton();
	});
	const valid = computed(() => {
		return email.value != '' && password.value != '';
	});

	const login = async () => {
		loading.value = true;
		errors.value = { email: '', password: '' };

		try {
			await authStore.login(email.value, password.value);
			await userStore.getUser();

			await router.push('/dashboard');
		} catch (error) {

			errors.value = error?.response?.data;

		}

		loading.value = false;
	};
</script>
