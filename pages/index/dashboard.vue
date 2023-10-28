<template>
	<Head>
		<title>Dashboard</title>
	</Head>
	<AdminLayout>
		<div class="max-w-7xl mt-10 mx-auto flex justify-between">
			<div class="flex items-center  w-full flex-wrap gap-5 justify-center lg:justify-start">
				<div
					class="flex p-4 gap-4 justify-between px-5 rounded-lg md:gap-6 bg-base-200 text-base-content min-w-[18rem] w-full lg:w-fit">
					<div class="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
						<icon name="solar:card-bold" size="35" />
					</div>
					<div class="flex flex-col justify-center text-center">
						<p class="text-3xl font-semibold leadi">{{ user.cards.length }}</p>
						<p class="capitalize">{{$t('cards')}}</p>
					</div>
				</div>

				<div
					class="flex p-4 gap-4 justify-between px-5 rounded-lg md:gap-6 bg-base-200 text-base-content min-w-[18rem] w-full lg:w-fit">
					<div class="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
						<icon name="mingcute:finger-tap-fill" size="35" />
					</div>
					<div class="flex flex-col justify-center text-center">
						<p class="text-3xl font-semibold leadi">{{ user.views }}</p>
						<p class="capitalize">{{$t('taps')}}</p>
					</div>
				</div>

				<NuxtLink to="/products"
					class="flex p-4 gap-4 justify-between px-5 rounded-lg md:gap-6 bg-base-200 text-base-content min-w-[18rem] w-full lg:w-fit">
					<div class="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
						<icon name="mdi:cart" size="35" />

					</div>
					<div class="flex flex-col justify-center align-middle">
						<p class="text-3xl font-semibold leadi">{{$t('products')}}</p>
					</div>
				</NuxtLink>
				<NuxtLink to="/account"
					class="flex p-4 gap-4 justify-between px-5 rounded-lg md:gap-6 bg-base-200 text-base-content min-w-[18rem] w-full lg:w-fit">
					<div class="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
						<icon name="material-symbols:settings" size="35" />

					</div>
					<div class="flex flex-col justify-center align-middle">
						<p class="text-3xl font-semibold leadi">{{$t('settings')}}</p>
					</div>
				</NuxtLink>
			</div>
		</div>

		<div class="max-w-7xl mx-auto my-5 flex gap-4 flex-wrap lg:flex-nowrap">
			<div class="flex flex-col gap-5 p-5 rounded-lg bg-base-200 lg:w-[60rem] w-full items-center">
				<LinkCardModal :show="showAddModal" @close="showAddModal = false" />

				<div class="flex justify-between w-full">
					<h1 class="text-2xl font-medium">
						{{$t('cards')}}
					</h1>
					<button @click="showAddModal = true" v-if="user.cards.length != 0" class="btn btn-sm btn-info">
						+
					</button>
				</div>
				<div class="w-full max-h-96 overflow-auto">
					<div v-if="user.cards.length != 0" class="flex flex-col gap-3">
						<div v-for="card in user.cards" @click="selectCard(card)">
							<div class="bg-primary  p-4 rounded text-primary-content flex items-center justify-between gap-2  cursor-pointer"
								:class="[card.id == activeCard.id && 'border-2 border-base']">

								<div class="flex items-center gap-2">
									<icon name="solar:card-bold" size="30" />
									<div>{{ card.name }}</div>
								</div>

								<div @click.stop="">
									<NuxtLink :to="'/profile/' + card.id" class="btn btn-base">
										{{ $t('editProfile') }}
									</NuxtLink>
								</div>
							</div>
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
			<div class="w-full  overflow-hidden rounded-lg  flex flex-col items-start gap-8">
				<div class="lg:w-[40rem] text-3xl font-medium text-base-content">{{$t('views')}}</div>
				<div class="lg:w-[40rem] " id="chart-wrapper">
					<canvas class="lg:w-[40rem] " ref="canvas" id="visitors"></canvas>
				</div>
			</div>
		</div>
	</AdminLayout>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { storeToRefs } from 'pinia';

definePageMeta({ middleware: ['is-logged-out', "verify-email"] });
import AdminLayout from '~/layouts/AdminLayout.vue';
import { useUserStore } from '~/stores/user';

import axios from '~~/plugins/axios';
const $axios = axios().provide.axios;
const { user } = storeToRefs(useUserStore())
const showAddModal = ref(false);


const activeCard = ref({})


const data = ref([]);
const chart = ref(false)
const canvas = ref(null)

let enabled = true;

async function createChart() {

	const response = await $axios('/api/analytics/' + activeCard.value?.profile?.id);

	const visits = response.data.visits;

	chart.value = new Chart(canvas.value, {
		type: 'bar',
		data: {
			labels: visits.map((visit) => visit.period),
			datasets: [
				{
					label: 'Views',
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


}


onMounted(async () => {
	activeCard.value = user.value?.cards?.[0];
	createChart()
});


async function selectCard(card){
	if(!enabled) return
	enabled = false
	if(!chart.value) return
	if(!canvas.value) return



	activeCard.value = card

	try {
		
		chart.value.stop();
	
		chart.value.destroy();
	
		createChart()
	} catch (error) {
		alert(error)
	}


	setTimeout(() => enabled = true, 1000)

}

</script>

<style scoped></style>
