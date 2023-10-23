<template>
	<TransitionRoot
		appear
		:show="props.show"
		as="template"
	>
		<Dialog
			as="div"
			@close="emits('close')"
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
							class="cflex gap-6 justify-center flex-col items-center max-w-md transform rounded-2xl bg-base-200 p-6 shadow-xl transition-all"
						>
							<DialogTitle as="h3"></DialogTitle>
							<div class="flex flex-col gap-3">
								<!-- share to social media-->
								<a
									class="flex w-full justify-between items-center rounded-md cursor-pointer p-1"
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

	const props = defineProps(["show", "user"]);
	const { user } = toRefs(props);
	const emits = defineEmits(["close"]);
</script>
