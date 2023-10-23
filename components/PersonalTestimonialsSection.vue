<template>
	<div class="flex flex-col gap-4 items-center">
		<Button
			@click="showModal = true"
			type="primary"
			class="h-10 w-full px-8 mx-auto"
			>Add Testimonial</Button
		>
		<Splide
			v-if="testimonials?.length && testimonials?.length != 0"
			:has-track="false"
			:options="{
				perPage: 1,
				rewind: true,
				classes: {
					page: 'splide__pagination__page  bg-indigo-600', // each button
				},
			}"
			tag="div"
			class="lg:w-[30rem] w-[20rem]"
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
		<PersonalTestimonialModal
			:show="showModal"
			@close="showModal = false"
			@add="addTestimonial"
		/>
	</div>
</template>

<script setup>
	import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
	import "@splidejs/vue-splide/css/skyblue";

	import { storeToRefs } from "pinia";
	import { useTestimonialsStore } from "~/stores/testimonials";
	import { useUserStore } from "~/stores/user";
	const testimonialsStore = useTestimonialsStore();
	const { store, fetchAll } = testimonialsStore;
	const { testimonials } = storeToRefs(testimonialsStore);

	const showModal = ref(false);

	async function addTestimonial(testimonial) {
		await store(testimonial);
		await fetchAll();
		await useUserStore().getUser();
	}

	onMounted(async () => {
		await fetchAll();
	});
</script>

<style scoped></style>
