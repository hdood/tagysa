<template>
	<TransitionRoot appear :show="props.show" as="template">
		<Dialog as="div" @close="closeModal" class="relative z-10">
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
				<div class="flex min-h-full items-center justify-center p-4 text-center">
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
							class="w-full max-w-md h-full flex flex-col transform overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all"
						>
							<DialogTitle as="h3" class="text-lg font-medium text-base-content">
								<span>Add Service</span>
							</DialogTitle>
							<div class="mt-10 flex flex-col gap-5">
								<TextInput
									v-model:input="name"
									placeholder="Service Name"
									label="Service Name"
									:error="errors?.name"
								/>
								<TextInput
									v-model:input="url"
									placeholder="URL "
									label="URL (optional)"
									:error="errors?.url"
								/>
								<div class="flex flex-col gap-1">
									<span class="text-sm font-medium">Price</span>
									<div class="join">
										<select
											name=""
											v-model="currency"
											id=""
											class="select select-primary dropdown join-item"
										>
											<option value="USD">USD</option>
											<option value="INR">INR</option>
											<option value="EUR">EUR</option>
										</select>
										<div>
											<div class="">
												<input
													id="placeholder"
													placeholder="Price"
													maxlength="10"
													class="input input-bordered max-w-xs input-primary join-item w-40"
													type="number"
													v-model="price"
													autocomplete="off"
												/>
											</div>
										</div>
									</div>
								</div>

								<label for="bio" class="flex flex-col gap-2">
									<span class="text-sm font-medium">Description</span>

									<textarea
										class="textarea textarea-primary text-sm w-full py-3.5 px-3"
										placeholder="Bio"
										v-model="description"
										rows="4"
										maxlength="300"
										id="bio"
									></textarea>
								</label>

								<FileInput v-model="image">
									<Button type="success" class="px-2 h-10">Upload Image</Button>

									<div class="italic text-red-400" v-if="errors.image">
										please select an image for the service
									</div>

									<div
										v-if="image"
										class="mt-4 text-center flex justify-center flex-col items-center"
									>
										<img class="h-40" :src="uploadedImageSource" alt="" />
										{{ image?.name }}
									</div>
								</FileInput>
							</div>

							<Button type="primary" class="mx-auto h-10 px-2 mt-4" @click="add" :loading="loading">
								Add service
							</Button>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
	import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

	import { useUserStore } from '~/stores/user';
	import { useServicesStore } from '~/stores/services';
	import ValidateUrl from '~/composables/ValidateUrl';
	const { store, fetchAll } = useServicesStore();

	const name = ref('');
	const url = ref('');
	const description = ref('');
	const image = ref();
	const loading = ref(false);
	const price = ref(0);
	const currency = ref('USD');

	const uploadedImageSource = computed(() => URL.createObjectURL(image.value));

	const formattedPrice = computed(() =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency.value,
		}).format(price.value),
	);

	const errors = ref({});

	async function add() {
		errors.value == {};
		if (name.value == '') {
			errors.value.name = 'the name field is required';
			return;
		}
		if (!ValidateUrl(url.value) && url.value != '') {
			errors.value.url = 'the url field must be a valid url';
			return;
		}

		if (!image.value) {
			errors.value.image = true;
			return;
		}

		loading.value = true;
		await store(name.value, url.value, description.value, image.value, formattedPrice.value);
		loading.value = false;
		await fetchAll();
		await useUserStore().getUser();
		emit('close');
	}

	const emit = defineEmits(['close']);
	const props = defineProps(['show']);

	function closeModal() {
		emit('close');
	}
</script>
