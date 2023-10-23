<template>
	<TransitionRoot
		appear
		:show="props.show"
		as="div"
	>
		<Dialog
			as="div"
			@close="closeModal"
			class="relative z-10"
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
							class="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all"
						>
							<DialogTitle
								as="div"
								class="text-lg font-medium leading-6 text-base-content"
							>
								<icon
									name="ic:round-arrow-back"
									size="40"
									class="p-1 cursor-pointer rounded-md hover:bg-base-300"
									v-if="showInput"
									@click="showInput = false"
								/>
								<span v-else>Links</span>
							</DialogTitle>
							<div class="" 
							>
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
										v-if="showInput"
										class="mt-5 min-h-[10rem] flex flex-col items-center justify-between h-full"
									>
										<div class="space-y-3">
											<TextInput
												class="w-[20rem]"
												v-model:input="url"
												label="URL"
												:placeholder="
													selectedLink.default
												"
												:error="errors?.url?.[0]"
											/>
											<TextInput
												class="w-[20rem]"
												v-model:input="displayText"
												label="Text"
												placeholder="Display text"
												:error="errors?.text?.[0]"
											/>
										</div>
										<div
											class="w-full flex justify-end gap-3"
										>
											<button @click="closeModal">
												Cancel
											</button>

											<Button
												class="px-2 h-10"
												:loading="loading"
												type="primary"
												@click="addLink"
											>
												<div class="flex items-center">
													<span>Add Link</span>
												</div>
											</Button>
										</div>
									</div>
									<div
										class="min-h-[15rem] grid grid-cols-4 gap-4 gap-y-7 items-center justify-center mt-5"
										v-else
									>
										<div
											class="flex flex-col justify-center items-center gap-1 cursor-pointer p-1 rounded-md hover:bg-accent hover:text-accent-content"
											v-for="link in links"
											:key="link.name"
											@click="selectLink(link)"
										>
											<icon
												size="50"
												:name="link.icon"
											/>
											<span class="text-xs">
												{{ link.name }}
											</span>
										</div>
									</div>
								</transition>
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
	import links from "~/data/predefinedLinks";
	import { theme } from "~/data/theme";
	import { useLinksStore } from "~/stores/links";
	import { useUserStore } from "~/stores/user";
	const linksStore = useLinksStore();
	const userStore = useUserStore();

	const props = defineProps(["show"]);
	const emit = defineEmits(["close", "select"]);
	const displayText = ref("");
	const selectedLink = ref({});
	const url = ref("");
	const errors = ref({});
	const loading = ref(false);
	const showInput = ref(false);

	function closeModal() {
		showInput.value = false;
		url.value = "";
		displayText.value = "";
		emit("close");
	}

	async function addLink() {
		errors.value = {};
		if (url.value == "") {
			errors.value = { url: ["please specify a url for this link"] };
			return;
		}
		loading.value = true;
		try {
			const response = await linksStore.addLink(
				selectedLink.value.name,
				url.value,
				selectedLink.value.icon,
				linksStore.all.length,
				displayText.value
			);
			await linksStore.getAllLinks();
			url.value = "";
			displayText.value = "";
			userStore.refreshFrame();
			showInput.value = false;

		} catch (error) {
			errors.value = error.response.data.errors;
		}
		closeModal(); 
		loading.value = false;
	}

	function selectLink(link) {
		selectedLink.value = link;
		showInput.value = true;
		url.value = selectedLink.value.default;
		displayText.value = selectedLink.value.name;
	}
</script>
