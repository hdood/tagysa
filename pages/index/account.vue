<template>
	<Head>
		<title>Account</title>
	</Head>

	<AdminLayout>
		<div class="flex lg:gap-3 md:gap-3 gap-6 flex-wrap lg:flex-nowrap max-w-7xl mx-auto">
			<ConfirmModal :show="deleteConfirm" title="Logout" body="Are you sure you want to logout" type="danger"
				@close="deleteConfirm = false" @confirm="logout()" positive="Logout" />
			<Button type="danger" @click="deleteConfirm = true" class="w-full lg:hidden">Logout</Button>
			<div class="flex gap-3 w-full lg:max-w-fit">
				<div class="w-full lg:w-56">
					<ul class="menu lg:w-56 w-full rounded-box space-y-3 shadow-lg bg-base-200">
						<li>
							<NuxtLink to="/account" :class="[
								useRoute().name == 'admin-account' && 'active',
							]">
								Account
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/account/cards" :class="[
								useRoute().name == 'admin-account' && 'active',
							]">
								{{$t("cards")}}
							</NuxtLink>

						</li>
						
					</ul>
				</div>
			</div>
			<div class="w-full bg-base-200 rounded-2xl p-5 shadow min-h-fit">
				<NuxtPage />
			</div>
		</div>
	</AdminLayout>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import AdminLayout from "~/layouts/AdminLayout.vue";
definePageMeta({ middleware: "is-logged-out" });

const authStore = useAuthStore();
const deleteConfirm = ref(false);

async function logout() {
	await authStore.logout();
	useRouter().push("/login");
}
</script>

<style scoped></style>
