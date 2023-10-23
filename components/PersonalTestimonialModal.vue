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
										class="textarea textarea-primary text-sm w-full py-3.5 px-3"
										placeholder="Content"
										v-model="testimonial.content"
										rows="4"
										maxlength="300"
										id="bio"
									></textarea>
									<div
										v-if="errors?.content"
										class="text-sm text-red-600 italic"
									>
										{{ errors?.content }}
									</div>
								</label>
								<div class="font-medium">Rating</div>
								<div class="flex items-center mb-4 gap-2">
									<div class="rating">
										<input
											type="radio"
											name="rating-1"
											class="mask mask-star bg-secondary"
											v-model="testimonial.rating"
											:value="1"
										/>
										<input
											type="radio"
											name="rating-1"
											class="mask mask-star bg-secondary"
											:value="2"
											v-model="testimonial.rating"
										/>
										<input
											type="radio"
											name="rating-1"
											:value="3"
											v-model="testimonial.rating"
											class="mask mask-star bg-secondary"
										/>
										<input
											type="radio"
											name="rating-1"
											:value="4"
											v-model="testimonial.rating"
											class="mask mask-star bg-secondary"
										/>
										<input
											type="radio"
											name="rating-1"
											:value="5"
											v-model="testimonial.rating"
											class="mask mask-star bg-secondary"
										/>
									</div>
									<div>{{ testimonial.rating }}</div>
								</div>
								<FileInput v-model="testimonial.image">
									<Button
										type="success"
										class="px-2 h-10"
										>Upload Profile Picture</Button
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
										{{ testimonial.image.name }}
									</div>
								</FileInput>
							</div>

							<div class="w-full flex justify-end">
								<Button
									type="primary"
									class="h-10 px-2 mt-4 max-w-fit"
									@click="add"
									:loading="loading"
								>
									Add Testimonial
								</Button>
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
	const loading = ref(false);
	const emit = defineEmits(["close", "add"]);
	const props = defineProps(["show"]);
	import vue3starRatings from "vue3-star-ratings";

	const testimonial = ref({
		userName: "",
		content: "",
		image: null,
		rating: 2,
	});

	const errors = ref({});
	const uploadedImageSource = computed(() =>
		testimonial.value.image
			? URL.createObjectURL(testimonial.value.image)
			: null
	);

	async function add() {
		errors.value = {};
		if (testimonial.value.userName == "") {
			errors.value.userName = "the name field is required";
			return;
		}
		if (testimonial.value.content == "") {
			errors.value.content = "the content field is required";
			return;
		}
		loading.value = true;

		emit("add", testimonial.value);
		testimonial.value.userName = "";
		testimonial.value.content = "";
		testimonial.value.image = undefined;
		testimonial.value.rating = 1;
		loading.value = false;
		emit("close");
	}

	function closeModal() {
		emit("close");
	}
</script>
