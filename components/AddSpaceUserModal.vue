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
							class="w-full max-w-md h-full flex flex-col transform rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all"
						>
							<DialogTitle
								as="h3"
								class="text-lg font-medium text-base-content mb-7"
							>
								<span>Add User</span>
							</DialogTitle>
							<div
								class="card shadow-md text-base-content max-w-sm lg:max-w-lg mb-4"
								v-if="user"
								:data-theme="user.theme"
							>
								<div class="card-body">
									<div class="card-title">
										<div class="flex gap-3 items-center">
											<div class="avatar">
												<div class="w-16 rounded">
													<img
														:src="user.image"
														alt="Tailwind-CSS-Avatar-component"
													/>
												</div>
											</div>
											<div>
												<div class="font-medium">
													{{ user.name }}
												</div>
												<div
													class="font-medium text-xs"
												>
													{{ user.email }}
												</div>
											</div>
										</div>
									</div>
									<div class="card-actions justify-end">
										<a
											class="btn btn-primary"
											:href="'/' + user.name"
											target="_blank"
											>Profile</a
										>
									</div>
								</div>
							</div>

							<form @submit.prevent="addUser">
								<div class="label-text">Search by name</div>
								<SearchInput
									v-slot="{ active, user, selected }"
									@select="select"
									combobox-classes="absolute mt-4 left-3 lg:left-0 max-h-60 max-w-md min-w-[17rem] lg:min-w-[15rem] flex flex-col overflow-auto rounded-md bg-base-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
								>
									<li
										class="relative flex items-center gap-3 select-none py-2 pl-10 px-4 w-11/12 rounded-md cursor-pointer"
										:class="{
											'bg-primary text-primary-content':
												active,
										}"
									>
										<div class="avatar">
											<div class="w-8 rounded">
												<img
													:src="user.image"
													:alt="`${user.name} profile image`"
												/>
											</div>
										</div>
										<span
											class="block truncate"
											:class="{
												'font-medium': selected,
												'font-normal': !selected,
											}"
										>
											{{ user.name }}
										</span>
										<span
											v-if="selected"
											class="absolute inset-y-0 left-0 flex items-center pl-3"
											:class="{
												'text-white': active,
												'text-teal-600': !active,
											}"
										>
											<CheckIcon
												class="h-5 w-5"
												aria-hidden="true"
											/>
										</span>
									</li>
								</SearchInput>
								<div class="w-full flex justify-end mt-4">
									<Button
										:type="
											!user.name ? 'disabled' : 'primary'
										"
										class="h-10 px-3"
										:loading="loading"
									>
										Add user
									</Button>
								</div>
							</form>
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
	import { useSpacesStore } from "~/stores/spaces";
	const spacesStore = useSpacesStore();

	const error = ref("");
	const loading = ref(false);

	const emit = defineEmits(["close", "add"]);
	const props = defineProps(["show"]);
	const user = ref(false);

	async function addUser() {
		emit("add", user.value.name);
		emit("close");
	}

	function select(_user) {
		user.value = _user;
	}

	function closeModal() {
		emit("close");
	}
</script>
