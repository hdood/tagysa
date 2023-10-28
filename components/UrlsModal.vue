<template>
	<TransitionRoot appear :show="props.show" as="div">
		<Dialog as="div" @close="closeModal" class="relative z-10">
			<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
				leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95">
						<DialogPanel
							class="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all">
							<DialogTitle as="div" class="text-lg font-medium leading-6 text-base-content">
								<span >Add Link</span>
							</DialogTitle>
							<div class="">
									<div 
										class="mt-5 min-h-[10rem] flex flex-col items-center justify-between h-full">
										<div class="space-y-3">
											<TextInput class="w-[20rem]" v-model:input="url" label="URL" :placeholder="selectedLink.default
												" :error="errors?.url?.[0]" />
											<TextInput class="w-[20rem]" v-model:input="displayText" label="Name"
												placeholder="Display text" :error="errors?.text?.[0]" />
										</div>
										<div class="w-full flex justify-end gap-3 my-4">
											<button @click="closeModal">
												Cancel
											</button>

											<Button class="px-2 h-10" :loading="loading" type="primary" @click="addLink">
												<div class="flex items-center">
													<span>Add Link</span>
												</div>
											</Button>
										</div>
									</div>
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
import { useUrlsStore } from "~/stores/urls";
import { useUserStore } from "~/stores/user";
const urlsStore = useUrlsStore();
const userStore = useUserStore();

const props = defineProps(["show"]);
const emit = defineEmits(["close", "select"]);
const displayText = ref("");
const selectedLink = ref({});
const url = ref("");
const errors = ref({});
const loading = ref(false);
const showInput = ref(false);

const { activeProfile: user } = storeToRefs(useProfileStore());

onMounted(async () => {
	await useProfileStore().fetchProfile(useRoute().params.id)
})


function closeModal() {
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
		const response = await urlsStore.addLink(
			displayText.value,
			url.value,
			urlsStore.all.length,
			user.value.id

		);
		await urlsStore.getAllLinks(user.value.id);
		url.value = "";
		displayText.value = "";
		userStore.refreshFrame();


	} catch (error) {
		errors.value = error.response.data.errors;
	}
	closeModal();
	loading.value = false;
}

</script>
