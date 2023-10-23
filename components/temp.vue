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
								as="div"
								class="text-lg font-medium leading-6 text-base-content"
							>
								<span>Pick Image</span>
							</DialogTitle>

							<div class="flex items-center bg-white px-4 pb-4">
								<div class="w-full">
									<div
										v-if="!uploadedImage"
										class="my-4"
									>
										<FileInput v-model="file">
											<Button
												class="w-full p-3 font-semibold"
												type="primary"
											>
												<label
													for="file"
													class="w-full h-full"
												>
													Upload photo
												</label>
												<!-- <input
                                                    type="file"
                                                    id="file"
                                                    class="hidden"
                                                    @change="getUploadedImage"
                                                /> -->
											</Button>
										</FileInput>
									</div>

									<div
										v-if="
											!uploadedImage &&
											video &&
											video.paused
										"
										class="my-4"
									>
										<Button
											type="primary"
											@click="startCamera()"
											class="w-full py-3 font-semibold mb-2 cursor-pointer text-center"
										>
											Open camera
										</Button>
									</div>

									<div
										v-show="isOpenCamera"
										class="pb-4"
									>
										<video
											v-show="!isNewPhoto"
											ref="video"
											class="aspect-square"
										/>
										<canvas
											v-show="isNewPhoto"
											ref="canvas"
											class="aspect-square"
										/>
									</div>

									<div class="max-w-lg w-full mx-auto">
										<Cropper
											class="object-cover"
											ref="cropper"
											:stencil-props="{
												movable: true,
												resizable: true,
											}"
											:resize-image="{
												adjustStencil: false,
											}"
											image-restriction="stencil"
											:src="uploadedImage"
										/>
									</div>

									<div
										class="flex gap-4"
										:class="uploadedImage ? 'pt-4' : ''"
									>
										<Button
											v-if="isOpenCamera"
											@click="takePhoto()"
											class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] cursor-pointer focus:outline-none focus:ring-0"
										>
											<span v-show="!isTakingPhoto"
												>Take photo</span
											>
											<Icon
												v-show="isTakingPhoto"
												name="eos-icons:loading"
												size="25"
											/>
										</Button>
										<button
											v-if="uploadedImage"
											@click="cropImage()"
											class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] cursor-pointer focus:outline-none focus:ring-0"
										>
											<span v-show="!isCropping"
												>Crop Image</span
											>
											<Icon
												v-show="isCropping"
												name="eos-icons:loading"
												size="25"
											/>
										</button>
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

	import { Cropper } from "vue-advanced-cropper";
	import "vue-advanced-cropper/dist/style.css";

	const emit = defineEmits(["close", "data"]);

	const props = defineProps({
		linkId: { type: Number, required: false },
		show: { type: Boolean, required: true },
	});

	const { linkId } = toRefs(props);

	let file = ref(null);
	let video = ref(null);
	let canvas = ref(null);
	let isNewPhoto = ref(null);
	let isOpenCamera = ref(null);
	let photoData = ref(null);
	let cropper = ref(null);
	let uploadedImage = ref(null);
	let isTakingPhoto = ref(false);
	let isCropping = ref(false);

	const getUploadedImage = (e) => {
		file.value = e.target.files[0];
		uploadedImage.value = URL.createObjectURL(e.target.files[0]);
	};

	watch(file, (value) => console.log(value));

	const startCamera = async () => {
		isOpenCamera.value = true;

		if (navigator.mediaDevices) {
			let stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { max: 1024 },
					height: { max: 1024 },
					aspectRatio: { ideal: 1 },
				},
			});
			video.value.srcObject = stream;
			video.value.play();
		}
	};

	const takePhoto = () => {
		let videoLocal = video.value;
		let canvasLocal = canvas.value;

		canvasLocal.width = videoLocal.getBoundingClientRect().width;
		canvasLocal.height = videoLocal.getBoundingClientRect().height;

		let context = canvasLocal.getContext("2d");
		context.drawImage(
			videoLocal,
			0,
			0,
			canvasLocal.width,
			canvasLocal.height
		);
		isNewPhoto.value = true;
		photoData.value = canvasLocal.toDataURL();

		convertBlobToUrl();
	};

	const convertBlobToUrl = async () => {
		const blob = await (await fetch(photoData.value)).blob();
		file.value = new File([blob], "NEW_PHOTO.png", { type: blob.type });
		uploadedImage.value = URL.createObjectURL(file.value);
		isOpenCamera.value = false;
	};

	const cropImage = async () => {
		isCropping.value = true;
		const { coordinates } = cropper.value.getResult();

		let data = new FormData();
		data.append("image", file.value || "");
		data.append("height", coordinates.height || "");
		data.append("width", coordinates.width || "");
		data.append("left", coordinates.left || "");
		data.append("top", coordinates.top || "");
		data.append("id", linkId.value || "");

		isCropping.value = true;
		emit("data", data);
	};

	onUnmounted(() => {
		video?.value?.pause?.();
		if (video.value) {
			video.value.currentTime = 0;
		}
	});

	function closeModal() {
		emit("close");
	}
</script>
