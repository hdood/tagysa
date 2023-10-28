<template>
	<Head>
		<title>Register</title>
	</Head>

	<div class="flex flex-col items-center justify-center min-h-screen p-3 gap-10 bg-base-200">
		<div>
			<Logo class="w-20 h-20" />
		</div>
		<div class="bg-base-100 flex rounded-xl shadow-md">
			<div class="flex flex-col items-center justify-center w-full gap-6 py-3 px-7 lg:min-w-fit lg:w-[30rem]">
				<div class="space-y-3">
					<div class="text-2xl font-medium text-center text-primary">Register</div>
				</div>

				<div v-if="socialError" class="text-error">
					{{ socialError }}
				</div>



				<form @submit.prevent="register" class="flex flex-col gap-3 items-center">
					<div class="flex flex-col gap-2 items-center">
						<TextInput v-model:input="name" label="Username" placeholder="jhon_doe"
							:error="errors?.name?.[0]" />
						<TextInput v-model:input="email" label="Email" placeholder="j.doe@email.com" inputType="email"
							:error="errors?.email?.[0]" />
						<TextInput v-model:input="password" placeholder="Password" label="Password" inputType="password"
							:error="errors?.password?.[0]" />
						<TextInput v-model:input="confirmPassword" placeholder="Confirm Password"
							label="Password Confirmation" inputType="password" :error="errors?.confirmPassword?.[0]" />
					</div>
					<Button :type="valid ? 'primary' : 'disabled'" :loading="loading" class="mt-3 w-full"> Sign Up </Button>
				</form>



				
				<div class="w-full text-center">Or</div>
				<div id="buttonEL" ref="buttonEl"></div>

				<div class="text-sm">
					<RouterLink to="/login" class=" text-base underline">Login</RouterLink>
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
import { storeToRefs } from 'pinia';
const socialStore = useSocialStore();
const authStore = useAuthStore();
const buttonEl = ref(null);
const router = useRouter();

const { error: socialError } = storeToRefs(socialStore);

definePageMeta({ middleware: 'is-logged-in' });
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref({});
const loading = ref(false);

onMounted(async () => {
	const googleProvider = await initGoogleProvider();

	const renderButton = googleProvider.useRenderButton({
		useOneTap: true,
		element: buttonEl.value,
		onError: () => console.error('Failed to render button'),
		onSuccess: async (res) => {
			loading.value = true;
			if (await socialStore.googleRegister(res)) {
				return useRouter().push('/dashboard');
			}
			loading.value = true;
			return true;
		},
	});
	renderButton();
});

const valid = computed(() => {
	errors.value = {};

	if (
		
		name.value == '' ||
		email.value == '' ||
		password.value == '' ||
		confirmPassword.value == '' ||
		password.value !== confirmPassword.value 
		
	) {
		return false;
	}

	return true;
});

const register = async () => {
	errors.value = {};
	loading.value = true;

	if (name.value.trim().includes(' ')) {
		errors.value = {
			name: ['Name must only contain letters and underscores'],
		};

		loading.value = false;

		return false;
	}

	if (password.value !== confirmPassword.value) {
		errors.value.confirmPassword = ['password confirmation does not match the password'];
		loading.value = false;

		return false;
	}

	try {
		await authStore.register(
			name.value.trim(),
			email.value,
			password.value,
			confirmPassword.value,
		);
		router.push('/verify');
	} catch (error) {
		console.log(error);
		errors.value = error.response.data.errors;
	}
	loading.value = false;
};
</script>
