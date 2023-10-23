<template>
	<Head><title>NFC</title></Head>
	<div class="w-full lg:p-5 min-h-screen">
		<div class="mb-3 flex w-full justify-end">
			<NuxtLink to="/admin/nfc/orders">
				<Button type="primary">
					My orders
					<div class="badge">{{ orders.length }}</div>
				</Button>
			</NuxtLink>
		</div>
		<TabGroup
			as="div"
			class="w-full flex gap-3 bg-base-100 lg:flex-nowrap flex-wrap rounded shadow-xl hover:shadow-2xl duration-300 p-4 transition-all overflow-hidden"
			v-slot="{ selectedIndex }"
		>
			<TebPanels as="div" class="w-full">
				<component :is="card" v-for="card in cardInputs" @order="captureForm">
					<template #tabList>
						<div class="lg:text-3xl text-2xl font-medium">Design your NFC card</div>
						<div class="">Choose Card Type</div>
						<TabList as="div" class="flex gap-2 w-full">
							<Tab as="div" class="focus:outline-none" v-slot="{ selected }">
								<button
									:class="[
										selected
											? 'btn btn-primary text-white  shadow'
											: 'text-neutral btn-primary btn btn-outline   ',
									]"
									class="btn-sm lg:btn-md"
									@click="cardType = 'standard'"
								>
									<span>Standard</span>
								</button>
							</Tab>
							<Tab as="div" class="focus:outline-none" v-slot="{ selected }">
								<button
									:class="[
										selected
											? 'btn btn-primary text-white  shadow'
											: 'text-neutral btn-primary btn btn-outline   ',
									]"
									@click="cardType = 'infinite'"
									class="btn-sm lg:btn-md"
								>
									<span>Infinite</span>
								</button>
							</Tab>
							<Tab as="div" class="focus:outline-none" v-slot="{ selected }">
								<button
									:class="[
										selected
											? 'btn btn-primary text-white  shadow'
											: 'text-neutral btn-primary btn btn-outline   ',
									]"
									class="btn-sm lg:btn-md"
									@click="cardType = 'custom'"
								>
									<span>Custom</span>
								</button>
							</Tab>
						</TabList>
					</template>
					<template #orderDetails>
						<div class="my-5">
							<div class="">Order Summary</div>
							<OrderSummary :selectedIndex="selectedIndex" />
						</div>
					</template>
				</component>
			</TebPanels>
			<dialog id="address_modal" class="modal">
				<form @submit.prevent="() => true">
					<div class="container max-w-screen-lg mx-auto">
						<div class="bg-base-100 relative rounded shadow-lg p-4 px-4 md:p-8 mb-6">
							<button class="absolute right-3 top-2" onclick="address_modal.close()">
								<icon name="ph:x-bold" />
							</button>
							<div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
								<div class="text-gray-600">
									<p class="font-medium text-lg">Delivery Address</p>
								</div>
								<div class="lg:col-span-2">
									<div class="flex flex-col gap-y-3">
										<div class="form-control w-full max-w-xs">
											<label class="label">
												<span class="label-text">Address / Street</span>
											</label>
											<input
												type="text"
												placeholder="Type here"
												class="input input-bordered input-primary w-full"
												name="address"
												id="address"
												v-model="street"
											/>
											<label class="label text-error" v-if="errors.street">
												<span class="text-danger">{{ errors.street }}</span>
											</label>
										</div>

										<div class="flex gap-4 flex-wrap lg:flex-nowrap">
											<div class="form-control w-full max-w-xs">
												<label class="label">
													<span class="label-text">State</span>
												</label>
												<select class="select select-primary w-full max-w-xs" v-model="state">
													<option disabled selected value="default">Choose your state</option>
													<option v-for="(state, key) in states" :key="state">
														{{ key }}
													</option>
												</select>
												<label class="label text-error" v-if="errors.state">
													<span class="text-danger">{{ errors.state }}</span>
												</label>
											</div>

											<div class="form-control w-full max-w-xs">
												<label class="label">
													<span class="label-text">City</span>
												</label>
												<select class="select select-primary w-full max-w-xs" v-model="city">
													<option disabled selected value="default">Choose your city</option>
													<option v-for="city in cities" :key="city">
														{{ city.city }}
													</option>
												</select>
												<label class="label text-error" v-if="errors.city">
													<span class="text-danger">{{ errors.city }}</span>
												</label>
											</div>

											<div class="form-control w-full max-w-xs">
												<label class="label">
													<span class="label-text">Zip code</span>
												</label>
												<input
													type="text"
													name="zipcode"
													id="zipcode"
													class="input input-primary max-w-[7rem]"
													v-model="zipCode"
													zipCode
													placeholder="19000"
												/>
												<label class="label text-error" v-if="errors.zipCode">
													<span class="text-danger">{{ errors.zipCode }}</span>
												</label>
											</div>
										</div>
										<div class="md:col-span-5 text-right">
											<div class="inline-flex items-end">
												<Button type="primary" :loading="loading" @click="order">
													Submit
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</dialog>
		</TabGroup>
	</div>
</template>

<script setup>
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
	import { usePaymentsStore } from '~/stores/payments';
	import html2canvas from 'html2canvas';
	import axios from '~~/plugins/axios';
	import StandardCard from '~/components/cards/StandardCard.vue';
	import InfiniteCard from '~/components/cards/InfiniteCard.vue';
	import CustomCard from '~/components/cards/CustomCard.vue';
	import { storeToRefs } from 'pinia';
	import { useOrdersStore } from '~/stores/orders';
	const material = ref('plastic');
	const cardType = ref('standard');
	const loading = ref(false);
	const $axios = axios().provide.axios;
	const cardInputs = [StandardCard, InfiniteCard, CustomCard];
	let states = ref({});
	const state = ref('default');
	const city = ref('default');
	const street = ref('');
	const zipCode = ref('');
	const errors = ref({});
	onMounted(async () => {
		const { data: _states } = await $axios('/api/states');
		states.value = _states;
		await fetchAll();
	});
	const cities = computed(() => states.value?.[state.value]);
	const logo = ref('');
	const paymentsStore = usePaymentsStore();
	const { checkout } = paymentsStore;
	const formData = ref({});

	const { orders } = storeToRefs(useOrdersStore());
	const { fetchAll } = useOrdersStore();

	async function captureForm(data) {
		formData.value = data;
		address_modal.showModal();
	}

	async function order() {
		if (loading.value) return;

		if (!validate()) return;

		loading.value = true;
		try {
			// const canvas = await html2canvas(document.querySelector(".nfc-card"));
			// const image = await canvasToBlob(canvas);

			formData.value.append(
				'address',
				JSON.stringify({
					street: street.value,
					state: state.value,
					city: city.value,
					zip_code: zipCode.value,
				}),
			);

			loading.value = true;
			const response = await checkout(formData.value);
			window.location = response.checkout_url;
		} catch (error) {}
		loading.value = false;
	}

	function validate() {
		errors.value = {};

		if (!street.value) {
			errors.value.street = 'Please select a street';
			return false;
		}
		if (!state.value) {
			errors.value.state = 'Please select a state';
			return false;
		}

		if (!city.value) {
			errors.value.city = 'Please select a city';
			return false;
		}

		if (!zipCode.value) {
			errors.value.zipCode = 'Please enter a zipCode';
			return false;
		}

		return true;
	}
</script>
