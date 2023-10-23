<template>
	<div>
		<div
			@click="toggle"
			class="h-4 w-8 rounded-full flex items-center transition-all cursor-pointer relative -z-1"
			:class="[
				props.on &&
					'bg-gradient-to-r from-indigo-500 to-indigo-700  transition-all',
				!props.on && 'bg-gray-300',
			]"
		>
			<div
				class="w-3 h-3 transition-all duration-200 rounded-full"
				:class="[
					props.on && 'translate-x-4 bg-white',
					!props.on && 'bg-indigo-600 translate-x-1',
				]"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { cva } from "class-variance-authority";
	const props = defineProps<{
		on?: boolean;
	}>();

	const emits = defineEmits(["toggle"]);

	const containerClass = cva("", {
		variants: {
			size: { sm: [], md: [], lg: [] },
		},
	});
	const switchClass = cva("", {
		variants: {
			size: { sm: [], md: [], lg: [] },
		},
	});

	function toggle() {
		emits("toggle");
	}
</script>

<style scoped></style>
