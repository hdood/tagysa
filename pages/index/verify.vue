<template>
	<Head>
		<title>Login</title>
	</Head>

	<div class="flex flex-col items-center h-screen p-3 bg-base-200 gap-14">
		<div>
			<Logo class="w-20 h-20" />
		</div>
		<div>
			<div v-if="sent.status == 'email verified'" class="flex flex-col gap-2 items-center text-center">
				<div>Email verified</div>
				<a href="/admin"><Button type="primary">Dashboard</Button></a>
			</div>
			<div v-else>Verification link was sent to {{ user.email }}</div>
		</div>
	</div>
</template>

<script setup>
	import { useUserStore } from '~~/stores/user';
	import { useSocialStore } from '~~/stores/social';
	import { useAuthStore } from '~/stores/auth';
	import { useLinksStore } from '~/stores/links';
	import { storeToRefs } from 'pinia';

	definePageMeta({ middleware: 'is-logged-out' });

	const userStore = useUserStore();
	const socialStore = useSocialStore();
	const authStore = useAuthStore();
	const linksStore = useLinksStore();

	const { sendVerificationLink } = authStore;
	const { user } = storeToRefs(userStore);

	const sent = ref({});

	onMounted(async () => {
		sent.value = await sendVerificationLink();
	});
</script>
