<template>
	<Head><title>Analytics</title></Head>

	<div class="w-full mt-10">
		<div
			class="mx-auto lg:w-[40rem] lg:max-w-5xl max-w-md text-lg font-medium text-black"
		>
			Views
		</div>
		<canvas
			class="lg:w-[40rem] mx-auto"
			id="visitors"
		></canvas>
	</div>
	<div class="w-full">
		<div
			class="mx-auto lg:w-[40rem] lg:max-w-5xl max-w-md text-lg font-medium text-black"
		>
			Devices
		</div>
		<canvas
			class="lg:w-[40rem] mx-auto"
			id="acquisitions"
		></canvas>
	</div>

	<div
		class="mx-auto lg:w-[40rem] lg:max-w-5xl max-w-md text-lg font-medium text-black my-10"
	>
		Views by countries
	</div>
	<div
		class="mx-auto lg:w-[40rem] lg:max-w-5xl max-w-md bg-base-200 rounded-lg p-2"
	>
		<div class="flex justify-end">
			<div class="text-xs">Views</div>
		</div>
		<div
			class="flex justify-between px-2 border-b pb-1 mb-4"
			v-for="(count, name) in data.countries"
			:key="name"
		>
			<div class="font-medium">
				{{ name }}
			</div>
			<div>
				{{ count }}
			</div>
		</div>
	</div>
	<div
		class="mx-auto lg:w-[40rem] lg:max-w-5xl max-w-md text-lg font-medium text-black my-10"
	>
		Views by cities
	</div>
	<div
		class="mx-auto lg:w-[40rem] lg:max-w-5xl max-w-md bg-base-200 rounded-lg p-2 mb-20"
	>
		<div class="flex justify-end">
			<div class="text-xs">Views</div>
		</div>
		<div
			class="flex justify-between px-2 border-b pb-1 mb-4"
			v-for="(count, name) in data.cities"
			:key="name"
		>
			<div class="font-medium">
				{{ name }}
			</div>
			<div>
				{{ count }}
			</div>
		</div>
	</div>

	<div
		class="mx-auto lg:w-[40rem] lg:max-w-5xl max-w-md text-lg font-medium text-black my-10"
	>
		Contact Savers
	</div>

	<div class="overflow-x-auto mx-auto mb-40">
		<table class="table mx-auto max-w-md">
			<thead>
				<tr>
					<th>Name</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				<tr
					v-for="contact in data.contactSavers"
					:key="contact.id"
				>
					<td>{{ contact.name }}</td>
					<td>
						<a
							:href="`mailto:${contact.email}`"
							class="btn btn-primary btn-sm"
						>
							Email
						</a>
					</td>
					<td>
						<a
							:href="`tel:${contact.phone}`"
							class="btn btn-primary btn-sm"
						>
							Call
						</a>
					</td>
					<!-- <td>{{ contact.email }}</td> -->
					<!-- <td>{{ contact.phone }}</td> -->
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	import Chart from "chart.js/auto";

	import axios from "~~/plugins/axios";
	const $axios = axios().provide.axios;

	const data = ref([]);

	onMounted(async () => {
		const response = await $axios("/api/analytics");
		data.value = response.data;

		const devices = response.data.devices;
		const visits = response.data.visits;

		new Chart(document.getElementById("acquisitions"), {
			type: "bar",
			data: {
				labels: devices.map((device) => device.name),
				datasets: [
					{
						label: "Devices",
						data: devices.map((row) => row.count.week),
					},
				],
			},
		});

		new Chart(document.getElementById("visitors"), {
			type: "bar",
			data: {
				labels: visits.map((visit) => visit.period),
				datasets: [
					{
						label: "Devices",
						data: visits.map((visit) => visit.count),
					},
				],
			},
		});
	});
</script>

<style scoped></style>
