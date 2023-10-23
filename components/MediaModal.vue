<template>
	<TransitionRoot
		appear
		:show="props.show"
		as="template"
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
								as="h3"
								class="text-lg font-medium leading-6 text-base-content"
							>
								<icon
									name="ic:round-arrow-back"
									size="40"
									class="p-1 cursor-pointer rounded-md hover:bg-base-300"
									v-if="showInput"
									@click="showInput = false"
								/>
								<span v-else>Media</span>
							</DialogTitle>
							<div class="">
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
										<component
											:is="
												mediaInputs?.[
													selectedMedia.input
												].component
											"
											:media="selectedMedia"
											@done="closeModal"
										/>
									</div>
									<div
										class="min-h-[15rem] grid grid-cols-4 gap-4 gap-y-7 items-center justify-center mt-5"
										v-else
									>
										<div
											class="flex flex-col justify-center items-center gap-1 cursor-pointer p-1 rounded-md hover:bg-accent text-center hover:text-accent-content"
											v-for="media in mediaTypes"
											@click="selectMedia(media)"
											:key="media.name"
										>
											<icon
												size="50"
												:name="media.icon"
											/>
											<span class="text-xs">
												{{ media.name }}
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
	import mediaTypes from "~/data/media";
	import Embedding from "./mediaInput/Embedding.vue";
	import File from "~/components/mediaInput/File.vue";
	import { useLinksStore } from "~/stores/links";
	import { useUserStore } from "~/stores/user";
	const linksStore = useLinksStore();
	const userStore = useUserStore();

	const props = defineProps(["show"]);
	const emit = defineEmits(["close", "select"]);
	const selectedMedia = ref({});
	const showInput = ref(false);

	function closeModal() {
		showInput.value = false;
		selectedMedia.value = {};

		emit("close");
	}

	function selectMedia(media) {
		selectedMedia.value = media;
		showInput.value = true;
	}

	const mediaInputs = {
		file: {
			name: "file",
			component: File,
		},
		embedding: {
			name: "embedding",
			component: Embedding,
		},
	};
</script>
