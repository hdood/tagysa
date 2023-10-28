<template>
	<TransitionRoot appear :show="props.show" as="div" :data-theme="theme">
		<Dialog as="div" @close="closeModal" class="relative z-10">
			<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
				leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-base-200 bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95">
						<DialogPanel
							class="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all">
							<DialogTitle as="div" class="text-lg font-medium leading-6 text-base-content">
								<icon name="ic:round-arrow-back" size="40"
									class="p-1 cursor-pointer rounded-md hover:bg-base-300" v-if="valid"
									@click="valid = false" />
								<span v-else class="">{{ $t('linkCard') }}</span>
							</DialogTitle>


							<transition enter-active-class="transition-all" enter-from-class="opacity-0 -translate-x-4"
								leave-active-class="transition-all" leave-to-class="opacity-0 translate-x-4" as="div"
								class="h-full" mode="out-in">
								<div v-if="valid"
									class="mt-5 min-h-[10rem] flex flex-col items-center justify-between h-full">
									<TextInput v-model:input="name" label="Card Name" v-model="name" :error="error" />

									<div class="w-full flex justify-end">
										<button class="btn btn-primary" @click="linkCard">
											Link Card
										</button>
									</div>

								</div>
								<div class="" v-else>
									<div v-if="error" class="text-error text-xl font-medium mt-4">
										{{ error }}
									</div>
									<div v-if="loading" class="w-full flex justify-end">
										<span class="loading loading-spinner loading-md text-primary"></span>
									</div>
									<div class="mt-10">
										<QrcodeStream :track="paintBoundingBox" :onDetect="onDetect" />
									</div>
								</div>
							</transition>
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
import { QrcodeStream } from "vue-qrcode-reader";
import { theme } from "~/data/theme";
import { useLinksStore } from "~/stores/links";
import { useUserStore } from "~/stores/user";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

const props = defineProps(["show"]);
const { show } = toRefs(props)
const emit = defineEmits(["close", "select"]);
const error = ref("");
const loading = ref(false);
const valid = ref(false);
const name = ref("")
const code = ref("")
const { user } = storeToRefs(useUserStore())

function closeModal() {
	emit("close");
}

watch(show, () => {
	error.value = ""
	valid.value = false
})

async function onDetect([firstDetectedCode], ctx) {
	error.value = "";
	const result = firstDetectedCode.rawValue
	const id = result.split("/")[result.split("/").length - 1]


	console.log(id)


	loading.value = true;

	const response = await $axios.post("/api/cards/check", {
		id
	});

	loading.value = false;

	if (response.data.error) {
		error.value = response.data.message
		return;
	}

	code.value = id;

	valid.value = true;
}


function paintBoundingBox(detectedCodes, ctx) {
	for (const detectedCode of detectedCodes) {
		const {
			boundingBox: { x, y, width, height }
		} = detectedCode

		ctx.lineWidth = 2
		ctx.strokeStyle = '#007bff'
		ctx.strokeRect(x, y, width, height)
	}
}

async function linkCard(){
	error.value = "";
	if(!name.value){
		error.value = "Please enter a name for the card";
		return;
	}

	try {
		
		const response = await $axios.post("/api/cards/link", {
			id: code.value,
			name : name.value
		});

		user.value = response.data.data

		emit("close");

	} catch (error) {
		alert(error);
	}

}

</script>
