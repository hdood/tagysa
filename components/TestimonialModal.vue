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
							class="w-full max-w-md h-full flex flex-col transform overflow-hidden rounded-2xl bg-base-300 p-6 text-left align-middle shadow-xl transition-all"
						>
							<DialogTitle
								as="h3"
								class="text-lg font-medium text-base-content"
							>
								<span>Add Testimonial</span>
							</DialogTitle>
							<div class="mt-10 flex flex-col gap-5">
								<TextInput
									v-model:input="testimonial.userName"
									placeholder="User Name"
									label="User Name"
									:error="errors?.userName"
								/>

								<label
									for="content"
									class="flex flex-col gap-2"
								>
									<span class="text-sm font-medium"
										>Content</span
									>
									<textarea
										v-model="testimonial.content"
										rows="4"
										maxlength="540"
										placeholder="Content"
										:rounded="true"
										id="content"
										class="w-full text-gray-800 border-2 text-sm focus:bg-gray-100 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:border-2 focus:border-indigo-600 focus:outline-none"
									></textarea>
									<div
										v-if="errors?.content"
										class="text-sm text-red-600 italic"
									>
										{{ errors?.content }}
									</div>
								</label>

								<FileInput v-model="testimonial.image">
									<Button
										type="success"
										class="px-2 h-10"
										>Upload Image</Button
									>

									<div
										v-if="testimonial.image"
										class="mt-4 text-center flex justify-center flex-col items-center"
									>
										<img
											class="h-40"
											:src="uploadedImageSource"
											alt=""
										/>
										{{ testimonial?.image?.name }}
									</div>
								</FileInput>
							</div>

							<Button
								type="primary"
								class="mx-auto h-10 px-2 mt-4"
								@click="add"
								:loading="loading"
							>
								Add Testimonial
							</Button>
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
	const loading = ref(false);
	const emit = defineEmits(["close", "add"]);
	const props = defineProps(["show"]);

	const testimonial = ref({
		userName: "",
		content: "",
		image: null,
	});

	const errors = ref({});

	const uploadedImageSource = computed(() =>
		URL.createObjectURL(testimonial.value.image)
	);

	async function add() {
		errors.value = {};
		if (testimonial.value.name == "") {
			errors.value.userName = "the name field is required";
			return;
		}
		if (testimonial.value.content == "") {
			errors.value.content = "the content field is required";
			return;
		}
		loading.value = true;

		emit("add", testimonial.value);
		testimonial.value.name = "";
		testimonial.value.content = "";
		testimonial.value.image = {};
		loading.value = false;
		emit("close");
	}

	function closeModal() {
		emit("close");
	}
</script>
