<template>
	<Head>
		<title>Login</title>
	</Head>

	<div class="flex flex-col items-center h-screen p-3 bg-base-200 gap-14">
		<div>
			<Logo class="w-20 h-20" />
		</div>
		<div>
			<div  class="text-center flex flex-col items-center gap-5">
				<div class="text-success">Verification link was {{resent ? 'resent' : 'sent'}} to {{ user.email }}</div>

				<div>Didn't receive a verification email click the button and we will send you another one</div>

				<button class="btn " @click="resend" :class="[!resent ? 'btn-primary' : 'btn-disabled']"> {{ !resent ? 'Resend verification link ' : 'resent'}}</button>

			</div>
			
		</div>
	</div>
</template>

<script setup>
	import { useUserStore } from '~~/stores/user';
	import { useSocialStore } from '~~/stores/social';
	import { useAuthStore } from '~/stores/auth';
	import { useLinksStore } from '~/stores/links';
	import { storeToRefs } from 'pinia';

	definePageMeta({ middleware: ['is-logged-out', "verify-email"] });

	const userStore = useUserStore();
	const socialStore = useSocialStore();
	const authStore = useAuthStore();
	const linksStore = useLinksStore();

	const { sendVerificationLink } = authStore;
	const { user } = storeToRefs(userStore);

	const sent = ref({});
	const resent = ref(false);


	async function resend(){
		sent.value = await sendVerificationLink();
		resent.value = true;
	}

</script>
