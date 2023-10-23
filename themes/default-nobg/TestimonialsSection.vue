<template>
	<div
	>
		<Splide
			v-if="testimonials.length != 0"
			:has-track="false"
			:options="{
				perPage: 1,
				rewind: true,
				classes: {
					page: 'splide__pagination__page  bg-indigo-600', // each button
				},
			}"
			tag="div"
			class="lg:w-[30rem] w-[20rem] mt-10"
			aria-label="Testimonials"
		>
			<SplideTrack>
				<SplideSlide
					v-for="testimonial in testimonials"
					:key="testimonial.id"
				>
					<PersonalTestimonial :testimonial="testimonial" />
				</SplideSlide>
			</SplideTrack>
		</Splide>
	</div>
</template>

<script setup>
	import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
	import "@splidejs/vue-splide/css/skyblue";

	const props = defineProps(["testimonials"]);
	import PersonalTestimonial from "../shared/PersonalTestimonial.vue";
	const { testimonials } = toRefs(props);
</script>
