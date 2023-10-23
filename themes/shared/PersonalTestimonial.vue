<template>
	<div class="p-6 rounded shadow-md bg-base-100 ">
		<p class="min-h-[10rem]">{{ testimonial.content }}</p>
		<div class="flex items-center mt-4 space-x-4">
			<img :src="testimonial.image" :alt="testimonial.userName + 'avatar'"
				class="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500">
			<div>
				<p class="text-lg font-semibold">{{ testimonial.userName }}</p>
				<div class="flex">
					<div v-for="i in 5" class="mask mask-star bg-accent h-4 w-4" :class="[
						i > testimonial.rating ? 'opacity-50' : '',
					]" :key="i" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(["testimonial"]);
const { testimonial } = toRefs(props);
</script>

<style></style>
