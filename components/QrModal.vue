<template>
	<TransitionRoot
		appear
		:show="props.show"
		as="template"
	>
		<Dialog
			as="div"
			@close="emits('close')"
			class="relative z-[999999]"
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
							class="cflex gap-6 justify-center flex-col items-center max-w-md transform rounded-2xl bg-base-200 p-6 shadow-xl transition-all"
						>
							<canvas
								class="w-96 h-96"
								:ref="mountQR"
							></canvas>

							<Button
								@click="downloadQR"
								type="primary"
								class="h-10 px-2"
								>Download PNG
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
	import QRCode from "qrcode";

	const props = defineProps(["show", "name"]);
	const emits = defineEmits(["close"]);

	const canvas = ref(undefined);

	function downloadQR() {
		const dt = canvas.value.toDataURL("image/png");
		const a = document.createElement("a");
		const newDt = dt.replace(
			/^data:application\/octet-stream/,
			"data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png"
		);

		a.href = newDt;
		a.download = "Qr code";

		a.click();
	}

	function mountQR(el) {
		if (!el) return;

		canvas.value = el;
		QRCode.toCanvas(
			el,
			`http://www.95dot.com/${props.name}`,
			{
				scale: 7,
			},
			function (error) {
				if (error) console.error(error);
			}
		);
	}
</script>
