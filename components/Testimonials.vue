<template>
	<div>
		<div class="w-full px justify-center py-1 flex mb-5">
			<Button
				type="primary"
				class="px-2 h-10"
				@click="showModal = true"
			>
				Add testimonial
			</Button>
		</div>
		<Splide
			v-if="service.testimonials.length != 0"
			:has-track="false"
			:options="{
				perPage: 2,
				rewind: true,
				focus: 'center',
				classes: {
					page: 'splide__pagination__page  bg-indigo-600', // each button
				},
			}"
			tag="div"
			class="lg:w-[40rem] mx-auto"
			aria-label="Testimonials"
		>
			<SplideTrack>
				<SplideSlide
					v-for="testimonial in service.testimonials"
					:key="testimonial.id"
				>
					<Testimonial :testimonial="testimonial" />
				</SplideSlide>
			</SplideTrack>
			<ul class="splide__pagination absolute"></ul>
		</Splide>

		<TestimonialModal
			:show="showModal"
			@close="showModal = false"
			@add="store"
		/>
	</div>
</template>

<script setup>
	import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
	import "@splidejs/vue-splide/css/skyblue";
	import { useServicesStore } from "~/stores/services";

	const props = defineProps(["service"]);
	const { service } = toRefs(props);
	const servicesStore = useServicesStore();
	const showModal = ref(false);

	const { storeTestimonial } = servicesStore;

	async function store(testimonial) {
		await storeTestimonial(service.value.id, testimonial);
		await servicesStore.fetchAll();
	}
</script>

<style></style>
