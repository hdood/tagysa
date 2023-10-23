<template>
	<div class="flex flex-col gap-5">
		<div
			class="mx-auto flex flex-col gap-10 justify-center max-w-sm"
			v-for="post in posts"
			:key="post.id"
		>
			<div class="max-w-7xl relative">
				<div class="relative w-full">
					<InstagramPost :media="post" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import InstagramPost from "./InstagramPost.vue";
	const props = defineProps(["media"]);

	const { media: posts } = toRefs(props);
</script>

<style scoped></style>
