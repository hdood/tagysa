<template>
	<div class="flex flex-col">
		<div
			class="mx-auto flex flex-col gap-10 justify-center max-w-sm"
			v-for="post in posts"
			:key="post.id"
		>
			<div class="h-full relative">
				<div class="relative w-full">
					<FacebookPost :media="post" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import FacebookPost from "./FacebookPost.vue";
	const props = defineProps(["media"]);

	const { media: posts } = toRefs(props);
</script>

<style scoped></style>
