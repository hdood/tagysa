<template>
	<TabPanel class="flex flex-wrap lg:flex-nowrap">
		<div
			class="bg-base-200 max-h-fit lg:basis-1/2 basis-full flex justify-center items-center py-3 lg:min-h-[30rem]"
		>
			<div
				class="lg:w-96 lg:h-52 h-40 w-72 rounded-lg shadow-lg relative grid place-items-center nfc-card bg-white"
			>
				<icon name="mdi:nfc" class="absolute right-3 top-2" size="25" />
				<Logo  class="absolute left-3 w-8 h-8 top-1"/>
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
					class="btn-sm lg:btn-md"
				>
					<span>Plastic</span>
				</button>
				<button
					@click="material = 'metal'"
					:class="[
						material == 'metal'
							? 'btn btn-primary text-white  shadow'
							: 'text-neutral btn-primary btn btn-outline   ',
					]"
					class="btn-sm lg:btn-md"
				>
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
					:error="errors?.name"
				/>
				<TextInput
					label="Title"
					v-model:input="cardDetails.title"
					placeholder="Your title"
					:error="errors?.title"
				/>
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
						v-model="coupon"
					/>
					<Button :loading="loading" :type="coupon ? 'primary' : 'disabled'" @click="fetchInfo()" :class="[applied && 'btn-disabled']">
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
	const errors = ref({});
	const material = ref('plastic');
	const cardDetails = ref({
		name: '',
		title: '',
	});
	const loading  = ref(false)

	const price = ref('');
	const initialPrice = ref('')
	const coupon = ref('');
	const paymentsStore = usePaymentsStore();
	const { getInfo } = paymentsStore;
	const applied = ref(false);

	const emits = defineEmits(['order']);

	async function order() {
		errors.value = {};
		const data = new FormData();

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

		data.append('type', 'infinite');
		data.append(
			'payload',
			JSON.stringify({
				material: material.value,
				name: cardDetails.value.name,
				title: cardDetails.value.title,
			}),
		);
		data.append('coupon', coupon.value);

		emits('order', data);
	}

	onMounted(async () => {
		await fetchInfo(true);
	});
	watch(material, () => {
		fetchInfo(true);
	});

	async function fetchInfo(initial = false) {
		const data = new FormData();

		data.append('type', 'infinite');
		data.append(
			'payload',
			JSON.stringify({
				material: material.value,
				name  : 'dummy name',
				title : "dummy title"
			}),
		);

		data.append('coupon', coupon.value);

		loading.value = true;
		const info = await getInfo(data);
		loading.value = false;

		if(info.price){
			price.value = info.price;
			if (!initial) applied.value = true;
			if(initial) initialPrice.value = info.price
			return
		}
		errors.value.coupon = "invalid coupon"
	}
</script>

<style scoped></style>
