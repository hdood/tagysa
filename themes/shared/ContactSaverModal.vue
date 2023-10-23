<template>
	<TransitionRoot
		appear
		:show="props.show"
		as="template"
	>
		<Dialog
			as="div"
			@close="closeModal"
			class="relative z-50"
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
								<span
									>Please introduce your self to
									{{
										user.full_name
											? user.full_name
											: user.name
									}}
								</span>
							</DialogTitle>

							<div class="flex flex-col gap-4">
								<form @submit.prevent="submit">
									<TextInput
										label="Full Name"
										placeholder="Jhon Doe"
										v-model:input="name"
										:error="
											errors && errors.name
												? errors.name[0]
												: ''
										"
									/>
									<TextInput
										label="Email"
										placeholder="j.doe@example.com"
										v-model:input="email"
										:error="
											errors && errors.email
												? errors.email[0]
												: ''
										"
									/>
									<div>
										<label class="label">
											<span class="label-text"
												>Phone</span
											>
										</label>
										<div class="join">
											<CountryCodePicker
												v-model="countryCode"
											/>
											<div>
												<div class="">
													<input
														id="placeholder"
														placeholder="Phone"
														maxlength="10"
														class="input input-bordered w-full max-w-xs input-primary join-item"
														type="number"
														v-model="phone"
														autocomplete="off"
													/>
												</div>
											</div>
										</div>
										<div class="text-sm text-error">
											{{
												errors && errors.phone
													? errors.phone[0]
													: ""
											}}
										</div>
									</div>
									<div class="w-full flex justify-end mt-3">
										<Button type="primary">Submit</Button>
									</div>
								</form>
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
	import { storeToRefs } from "pinia";
	import { useProfileStore } from "~/stores/profile";

	const { user } = storeToRefs(useProfileStore());
	const { storeContactSaver } = useProfileStore();
	const loading = ref(false);
	const emit = defineEmits(["close"]);
	const props = defineProps(["show"]);

	const name = ref("");
	const email = ref("");
	const phone = ref("");
	const countryCode = ref(91);
	const errors = ref({});

	watch(phone, (value) => {
		if (value.toString().length > 10) {
			phone.value = value.toString().slice(0, 10);
		}
	});

	async function submit() {
		if (name.value == "") {
			errors.value = { name: ["name value cannot be empty"] };
			return;
		}

		if (email.value == "") {
			errors.value = { email: ["email value cannot be empty"] };
			return;
		}
		if (phone.value.toString().length < 4) {
			errors.value = { phone: ["phone number must be 4 digits or more"] };
			return;
		}

		await storeContactSaver(
			name.value,
			email.value,
			`+${countryCode.value} ${phone.value}`
		);
		closeModal();
	}

	function closeModal() {
		emit("close");
	}
</script>
