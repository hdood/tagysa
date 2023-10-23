<template>
	<TabPanel as="div" class="flex justify-between w-full border flex-wrap lg:flex-nowrap">
		<div
			class="bg-base-200 max-h-fit lg:basis-1/2 basis-full flex justify-center items-center py-3 lg:min-h-[30rem]">
			<div
				class="lg:w-96 lg:h-52 h-40 w-72 rounded-lg shadow-lg relative grid place-items-center nfc-card bg-white">
				<icon name="mdi:nfc" class="absolute right-3 top-2" size="25" />
				<img class="absolute left-3 w-8 h-8 top-1" v-if="uploadedImageSource"  :src="uploadedImageSource" />
				<Logo class="absolute left-3 w-8 h-8 top-1" v-else />

				<div class="text-center">
					<div class="text-primary font-medium">
						<span v-if="!cardDetails.name">Your name</span>
						<span>{{ cardDetails.name }}</span>
					</div>
					<div class="lg:text-sm text-xs">
						<span v-if="!cardDetails.title"> Your title </span>
						<span>{{ cardDetails.title }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full lg:p-5 min-h-screen lg:basis-1/2 basis-full">
			<slot name="tabList" />
			<div class="">Choose Card Color</div>
			<div class="flex gap-2 w-full">
				<button
					@click="material = 'plastic'"
					:class="[
						material == 'plastic'
							? 'btn btn-primary text-white  shadow'
							: 'text-neutral btn-primary btn btn-outline   ',
					]"
					class="btn-sm lg:btn-md">
					<span>Plastic</span>
				</button>
				<button
					@click="material = 'metal'"
					:class="[
						material == 'metal'
							? 'btn btn-primary text-white  shadow'
							: 'text-neutral btn-primary btn btn-outline   ',
					]"
					class="btn-sm lg:btn-md">
					<span>Metal</span>
				</button>
			</div>
			<div class="text-sm text-error my-2">
				{{ errors?.material }}
			</div>
			<div>Customize your card details</div>
			<div>
				<TextInput
					label="Name"
					v-model:input="cardDetails.name"
					placeholder="Your name"
					:error="errors?.name" />
				<TextInput
					label="Title"
					v-model:input="cardDetails.title"
					placeholder="Your title"
					:error="errors?.title" />
			</div>
			<div class="mt-4">
				<FileInput v-model="logo">
					<div class="join join-vertical lg:join-horizontal">
						<button class="btn join-item btn-primary">Choose logo</button>
						<div class="join-item disabled bg-base-200 flex items-center min-w-[4rem] w-fit px-2">
							<span v-if="logo">{{ logo.name }}</span>
							<span v-else>No file selected</span>
						</div>
					</div>
				</FileInput>
				<div class="text-error my-2" v-if="errors.logo">
					{{ errors.logo }}
				</div>
			</div>
			<div v-if="logo" class="indicator mt-5 border">
				<div class="indicator-item badge badge-primary cursor-pointer" @click="logo = null">
					<icon name="ph:x-bold" />
				</div>
				<img class="w-40 h-40" :src="uploadedImageSource" />
			</div>
			<slot name="orderDetails" />

			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Promo code</span>
				</label>
				<div class="flex items-center gap-3">
					<input
						type="text"
						placeholder="Coupon"
						class="input input-bordered input-primary w-full max-w-xs"
						v-model="coupon" />
					<Button
						:loading="loading"
						:type="coupon ? 'primary' : 'disabled'"
						@click="fetchInfo()"
						:class="[applied && 'btn-disabled']">
						{{ applied ? 'applied' : 'apply' }}
					</Button>
				</div>
				<label class="label">
					<span v-if="errors?.coupon" class="text-red-500 italic text-sm">{{ errors?.coupon }}</span>
				</label>
			</div>
			<div class="border-t w-full flex items-center justify-between p-3">
				<div class="text-center">
					<div class="lg:text-sm text-xs">OneTime</div>
					<div class="text-neutral text-lg font-medium">₹{{ initialPrice }}</div>
				</div>
				<Button type="primary" @click="order"> Buy now at ₹{{ price }} </Button>
			</div>
		</div>
	</TabPanel>
</template>

<script setup>
	import { TabPanel } from '@headlessui/vue';
	import { usePaymentsStore } from '~/stores/payments';
	const logo = ref(null);
	const uploadedImageSource = computed(() => logo.value ? URL.createObjectURL(logo.value) : false);
	const material = ref('plastic');
	const cardDetails = ref({
		name: '',
		title: '',
	});
	const loading = ref(false);
	const errors = ref({});

	const price = ref('');
	const coupon = ref('');
	const paymentsStore = usePaymentsStore();
	const { getInfo } = paymentsStore;
	const applied = ref(false);
	const initialPrice = ref('');

	const emits = defineEmits(['order']);

	async function order() {
		const data = new FormData();
		errors.value = {};

		if (!material.value) {
			errors.value.material = 'please select a material for your card';
			return;
		}

		if (!cardDetails.value.name) {
			errors.value.name = 'please enter a your name';
			return;
		}
		if (!cardDetails.value.title) {
			errors.value.title = 'please enter a your title';
			return;
		}

		if (!logo.value) {
			errors.value.logo = 'please select a logo ';
			return;
		}

		data.append('type', 'custom');
		data.append(
			'payload',
			JSON.stringify({
				material: material.value,
				name: cardDetails.value.name,
				title: cardDetails.value.title,
				logo: await toBase64(logo.value),
			}),
		);
		data.append('coupon', coupon.value);

		emits('order', data);
	}

	const checkImageDimensions = (file) => {
		errors.value = {};
		if (file && file.type.startsWith('image/')) {
			const img = new Image();
			const logoWidth = 1500;

			const logoHeight = 1500;

			img.src = URL.createObjectURL(file);

			img.onload = () => {
				const imageWidth = img.width;
				const imageHeight = img.height;

				// Define the range of dimensions for small to medium logos
				const minWidth = logoWidth * 0.2; // Allow 20% variance
				const maxWidth = logoWidth * 1.8;
				const minHeight = logoHeight * 0.2;
				const maxHeight = logoHeight * 1.8;

				// Check if image dimensions fall within the specified range
				if (
					imageWidth >= minWidth &&
					imageWidth <= maxWidth &&
					imageHeight >= minHeight &&
					imageHeight <= maxHeight
				) {
				} else {
					errors.value.logo =
						'Selected file is an image, but its dimensions do not match a small to medium logo.';
					return;
				}
			};

			img.onerror = () => {
				errors.value.logo = 'Error loading image.';
			};
		} else {
			errors.value.logo = 'Selected file is not an image.';
		}
	};

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			if (!file) resolve(false);
			console.log(file);
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
		});

	// Watch logo for changes
	watch(logo, (newFile) => {
		if (!newFile) return;
		checkImageDimensions(newFile);
	});

	onMounted(async () => {
		await fetchInfo(true);
	});

	watch(material, () => {
		fetchInfo(true);
	});

	async function fetchInfo(initial = false) {
		const data = new FormData();

		data.append('type', 'custom');
		data.append(
			'payload',
			JSON.stringify({
				material: material.value,
			}),
		);

		data.append('coupon', coupon.value);
		loading.value = true;
		const info = await getInfo(data);
		loading.value = false;

		if (info.price) {
			price.value = info.price;
			if (!initial) applied.value = true;
			if (initial) initialPrice.value = info.price;
			return;
		}
		errors.value.coupon = 'invalid coupon';
	}
</script>

<style scoped>
	.glow {
		animation: glow 4000ms infinite;
	}

	@keyframes glow {
		0% {
			@apply bg-emerald-500;
		}
		10% {
			@apply bg-primary;
		}
		20% {
			@apply bg-primary;
		}
		30% {
			@apply bg-primary;
		}
		40% {
			@apply bg-violet-500;
		}
		50% {
			@apply bg-violet-500;
		}
		60% {
			@apply bg-violet-500;
		}
		70% {
			@apply bg-violet-500;
		}
		80% {
			@apply bg-emerald-500;
		}
		90% {
			@apply bg-emerald-500;
		}

		100% {
			@apply bg-emerald-500;
		}
	}
</style>
