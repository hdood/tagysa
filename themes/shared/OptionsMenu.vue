<template>
	<Menu
		as="div"
		class="relative inline-block text-left opacity-100"
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
					size="25"
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
				<div
					class="px-1 py-1"
					v-if="share"
				>
					<button
						:class="[
							'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3',
						]"
					>
						<icon
							name="logos:whatsapp-icon"
							size="20"
						/>
						Whatsapp
					</button>
				</div>
				<div
					class="px-1 py-1"
					v-else
				>
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

					<button
						@click="copyContent"
						:class="[
							'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3 text-base-content hover:bg-primary hover:text-primary-content',
						]"
					>
						<icon
							size="20"
							name="line-md:clipboard-check"
							v-if="copied"
						/>
						<icon
							v-else
							name="tabler:clipboard"
							size="20"
						/>
						{{ copied ? "copied!" : "Copy link" }}
					</button>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>

<script setup>
	import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
	import ShareModal from "~/themes/shared/ShareModal.vue";
	import { storeToRefs } from "pinia";
	import { useProfileStore } from "~/stores/profile";
	const { user } = storeToRefs(useProfileStore());

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
