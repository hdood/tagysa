<template>
	<AdminLayout>
		<div class="max-w-7xl mt-10 mx-auto flex justify-between">
			<div class="flex items-center justify-between w-full">
				<div class="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-base-200 text-base-content">
					<div class="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
						<icon name="solar:card-bold" size="35" />
					</div>
					<div class="flex flex-col justify-center align-middle">
						<p class="text-3xl font-semibold leadi">{{ user.cards.length }}</p>
						<p class="capitalize">Cards</p>
					</div>
				</div>

				<div class="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-base-200 text-base-content">
					<div class="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
						<icon name="mingcute:finger-tap-fill" size="35" />
					</div>
					<div class="flex flex-col justify-center align-middle">
						<p class="text-3xl font-semibold leadi">{{ user.cards.length }}</p>
						<p class="capitalize">Taps</p>
					</div>
				</div>

				<div class="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-base-200 text-base-content">
					<div class="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
						<icon name="mingcute:finger-tap-fill" size="35" />
					</div>
					<div class="flex flex-col justify-center align-middle">
						<p class="text-3xl font-semibold leadi">{{ user.cards.length }}</p>
						<p class="capitalize">Taps</p>
					</div>
				</div>

				<NuxtLink to="/products" class="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-base-200 text-base-content">
					<div class="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
						<icon name="mdi:cart" size="35" />

					</div>
					<div class="flex flex-col justify-center align-middle">
						<p class="text-3xl font-semibold leadi">Products</p>
					</div>
				</NuxtLink>
				<NuxtLink to="/account" class="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-base-200 text-base-content">
					<div class="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
						<icon name="material-symbols:settings" size="35" />

					</div>
					<div class="flex flex-col justify-center align-middle">
						<p class="text-3xl font-semibold leadi">Settings</p>
					</div>
				</NuxtLink>
			</div>
		</div>

		<div class="max-w-7xl mx-auto my-5 flex gap-4">
			<div class="flex flex-col gap-5 p-5 rounded-lg bg-base-200 lg:w-[60rem]">
				<LinkCardModal :show="showAddModal" @close="showAddModal = false" />

				<div class="flex justify-between">
					<h1 class="text-2xl font-medium">
						Cards
					</h1>
					<button v-if="user.cards.length != 0" class="btn btn-sm btn-info">
						+
					</button>
				</div>
				<div>
					<div v-if="user.cards.length != 0">
						<div v-for="card in user.cards">
							<NuxtLink to="/account/cards"
								class="bg-primary  p-4 rounded text-primary-content flex items-center gap-2">

								<icon name="solar:card-bold" size="30" />
								<div>{{ card.name }}</div>

							</NuxtLink>
						</div>
					</div>
					<div v-else>
						<div class="flex text-center flex-col items-center gap-3">
							<span class="text-xl font-medium">{{ $t('noCards') }}</span>
							<button class="btn btn-primary" @click="showAddModal = true">
								{{ $t("linkCard") }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full mt-10 overflow-hidden rounded-lg  ">
				<div class="mx-auto lg:w-[40rem] lg:max-w-5xl max-w-md text-lg font-medium text-black">Views</div>
				<canvas class="lg:w-[40rem] mx-auto" id="visitors"></canvas>
			</div>
		</div>
	</AdminLayout>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { storeToRefs } from 'pinia';

import AdminLayout from '~/layouts/AdminLayout.vue';
import { useUserStore } from '~/stores/user';

import axios from '~~/plugins/axios';
const $axios = axios().provide.axios;
const { user } = storeToRefs(useUserStore())
const showAddModal = ref(false);



const data = ref([]);

definePageMeta({ middleware: 'is-logged-out' });

onMounted(async () => {
	const response = await $axios('/api/analytics');
	data.value = response.data;

	const visits = response.data.visits;

	new Chart(document.getElementById('visitors'), {
		type: 'bar',
		data: {
			labels: visits.map((visit) => visit.period),
			datasets: [
				{
					label: 'Devices',
					data: visits.map((visit) => visit.count),
				},
			],
		},
		options: {
			plugins: {
				customCanvasBackgroundColor: {
					color: localStorage.getItem("tagysa-theme") == "winter" ? "white" : "black",
				},
			},
		},
		plugins: [
			{
				id: 'customCanvasBackgroundColor',
				beforeDraw: (chart, args, options) => {
					const { ctx } = chart;
					ctx.save();
					ctx.globalCompositeOperation = 'destination-over';
					ctx.fillStyle = options.color || '#99ffff';
					ctx.fillRect(0, 0, chart.width, chart.height);
					ctx.restore();
				},
			},
		],
	});
});
</script>

<style scoped></style>
