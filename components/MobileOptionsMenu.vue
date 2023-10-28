<template>
	<Menu
		as="div"
		class="absolute inline-block text-left opacity-100 z-50 right-2 top-2"
	>
		<div>
			<QrModal
				:show="showQrModal"
				@close="showQrModal = false"
				:name="user.name"
			/>
			<ShareModal
				:show="showShareModal"
				@close="showShareModal = false"
				:user="user"
			/>

			<MenuButton
				class="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-base-content cursor-pointer"
			>
				<icon
					size="30"
					name="pepicons-pop:dots-y"
				/>
			</MenuButton>
		</div>

		<transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-in"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0"
		>
			<MenuItems
				class="absolute right-0 mt-2 max-w-lg w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div class="px-1 py-1">
					<MenuItem
						as="div"
						v-slot="{ active }"
						@click="showQrModal = true"
					>
						<NuxtLink to="account">
							<button
								:class="[
									active
										? 'bg-primary text-primary-content'
										: 'text-base-content',
									'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3',
								]"
							>
								<icon
									name="mdi:account-key"
									size="17"
								/>
								Account
							</button>
						</NuxtLink>
					</MenuItem>
				</div>
				<div class="px-1 py-1">
					<MenuItem
						as="div"
						v-slot="{ active }"
						@click="showShareModal = true"
					>
						<button
							:class="[
								active
									? 'bg-primary text-primary-content'
									: 'text-base-content',
								'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3',
							]"
						>
							<icon
								name="material-symbols:share"
								size="20"
							/>
							Share
						</button>
					</MenuItem>
					<MenuItem
						as="div"
						v-slot="{ active }"
						@click="showQrModal = true"
					>
						<button
							:class="[
								active
									? 'bg-primary text-primary-content'
									: 'text-base-content',
								'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3',
							]"
						>
							<icon
								name="gg:qr"
								size="20"
							/>
							Qr
						</button>
					</MenuItem>
				</div>
				<div class="px-1 py-1">
					<MenuItem
						as="div"
						v-slot="{ active }"
						@click="deleteConfirm = true"
					>
						<button
							:class="[
								active
									? 'bg-primary text-primary-content'
									: 'text-base-content',
								'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3',
							]"
						>
							<icon
								name="oi:power-standby"
								size="17"
							/>
							Logout
						</button>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>

		<ConfirmModal
			:show="deleteConfirm"
			title="Logout"
			body="Are you sure you want to logout"
			type="danger"
			@close="deleteConfirm = false"
			@confirm="logout()"
			positive="Logout"
		/>
	</Menu>
</template>

<script setup>
	import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
	import ShareModal from "~/themes/shared/ShareModal.vue";
	import { storeToRefs } from "pinia";
	import { useUserStore } from "~/stores/user";
	import { useAuthStore } from "~/stores/auth";
	const authStore = useAuthStore();
	const deleteConfirm = ref(false);
	async function logout() {
		await authStore.logout();
		useRouter().push("/login");
	}

	const { user } = storeToRefs(useUserStore());

	const share = ref(false);
	const showQrModal = ref(false);
	const showShareModal = ref(false);
	const copied = ref(false);

	onUpdated(() => {
		console.log("updated");
	});
	onBeforeUpdate(() => {
		console.log("before updates");
	});

	const copyContent = async () => {
		try {
			await navigator.clipboard.writeText(
				`/${user.value.name}`
			);
			copied.value = true;
			setTimeout(() => {
				copied.value = false;
			}, 3000);
		} catch (err) {}
	};
</script>
