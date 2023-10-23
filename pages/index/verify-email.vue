<template>
	<Head>
		<title>Login</title>
	</Head>

	<div class="flex w-full flex-col items-center gap-8 pt-16 h-screen p-3 bg-base-200">
		<div>
			<Logo class="w-20 h-20" />
		</div>
		<div>Click the button to verify your email</div>
		<Button type="primary" @click="verify"> Verify Email </Button>
	</div>
</template>

<script setup>
	import { useUserStore } from '~~/stores/user';
	import { useSocialStore } from '~~/stores/social';
	import { useAuthStore } from '~/stores/auth';
	import { useLinksStore } from '~/stores/links';

	definePageMeta({ middleware: 'is-logged-out' });

	const userStore = useUserStore();
	const socialStore = useSocialStore();
	const authStore = useAuthStore();
	const linksStore = useLinksStore();

	const { verifyEmail } = authStore;
	const route = useRoute();

	const id = route.query.id;
	const signature = route.query.signature;

	async function verify() {
		const response = await verifyEmail(id, signature);
		if (response) {
			useRouter().push('/admin');
		}
	}
</script>
