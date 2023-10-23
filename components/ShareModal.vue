<template>
	<TransitionRoot
		appear
		:show="props.show"
		as="template"
	>
		<Dialog
			as="div"
			@close="closeModal"
			class="relative z-[999999]"
		>
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex min-h-full items-center justify-center p-4 text-center"
				>
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="w-full max-w-[20rem] transform overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all z-[999999]"
						>
							<DialogTitle
								as="h3"
								class="text-lg font-medium leading-6 text-base-content mb-6"
							>
								<icon
									name="ic:round-arrow-back"
									size="40"
									class="p-1 cursor-pointer hover:bg-indigo-300 rounded-md"
									@click="shareTo = false"
									v-if="shareTo"
								/>
								<div v-else>Share</div>
							</DialogTitle>
							<transition
								enter-active-class="transition-all"
								enter-from-class="opacity-0 -translate-x-4"
								leave-active-class="transition-all"
								leave-to-class="opacity-0 translate-x-4"
								as="div"
								class="h-full"
								mode="out-in"
							>
								<div
									class="flex flex-col gap-3"
									v-if="!shareTo"
								>
									<!-- share to social media-->
									<div
										@click="shareTo = true"
										class="flex w-full justify-between items-center hover:bg-gray-200 rounded-md cursor-pointer p-1"
									>
										<div class="flex items-center gap-2">
											<div
												class="text-indigo-900 bg-indigo-300 grid place-items-center p-1 rounded-md"
											>
												<icon
													name="material-symbols:share"
													size="30"
												/>
											</div>
											<div>Share to...</div>
										</div>
										<div>
											<icon
												size="20"
												name="icon-park:right"
											/>
										</div>
									</div>
									<!-- Qr code -->
									<div
										class="flex w-full justify-between items-center hover:bg-gray-200 rounded-md cursor-pointer p-1"
										@click="showQrModal = true"
									>
										<div class="flex items-center gap-2">
											<div
												class="text-teal-900 bg-teal-300 grid place-items-center p-1 rounded-md"
											>
												<icon
													name="gg:qr"
													size="30"
												/>
											</div>
											<div>QR code</div>
										</div>
										<div>
											<icon
												size="20"
												name="icon-park:right"
											/>
										</div>
									</div>
									<!-- copy to clipboard -->
									<div
										class="flex w-full justify-between items-center hover:bg-gray-200 rounded-md cursor-pointer p-1"
										@click="copyContent"
									>
										<div class="flex items-center gap-2">
											<div
												class="text-rose-900 bg-rose-300 grid place-items-center p-1 rounded-md"
											>
												<icon
													name="tabler:clipboard"
													size="30"
												/>
											</div>
											<div>Copy to clipboard</div>
										</div>
										<div>
											<icon
												class="text-green-600"
												size="25"
												name="line-md:clipboard-check"
												v-if="copied"
											/>
											<icon
												size="20"
												name="icon-park:right"
												v-else
											/>
										</div>
									</div>
								</div>

								<!-- share to section -->

								<div
									class="flex flex-col gap-3"
									v-else
								>
									<!-- share to social media-->
									<a
										class="flex w-full justify-between items-center hover:bg-gray-200 rounded-md cursor-pointer p-1"
										:href="`https://wa.me/?text=check my card by visiting this link : https://tagy.com/${user.name}`"
										target="_blank"
									>
										<div class="flex items-center gap-2">
											<div
												class="grid place-items-center p-1 rounded-md"
											>
												<icon
													name="logos:whatsapp-icon"
													size="30"
												/>
											</div>
											<div>Whatsapp</div>
										</div>
										<div>
											<icon
												size="20"
												name="icon-park:right"
											/>
										</div>
									</a>
								</div>
							</transition>

							<QrModal
								:show="showQrModal"
								@close="showQrModal = false"
								:name="user.name"
							/>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
	import {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogPanel,
		DialogTitle,
	} from "@headlessui/vue";
	import { useNotificationsStore } from "~/stores/notifications";
	const { errorNotification } = useNotificationsStore();

	const { user } = toRefs(props);
	const showQrModal = ref(false);
	const shareTo = ref(false);
	const copied = ref(false);

	const props = defineProps(["show", "user"]);

	const emit = defineEmits(["close"]);

	const copyContent = async () => {
		try {
			await navigator.clipboard.writeText(
				`/${user.value.name}`
			);

			copied.value = true;

			setTimeout(() => {
				copied.value = false;
			}, 3000);
		} catch (err) {
			errorNotification("failed to copy link to clipboard");
		}
	};

	function closeModal() {
		emit("close");
	}
</script>
