<template>
	<div
		class="w-12 flex items-center item-wrapper duration-300 justify-center"
		:class="[
			active && ' border-x-primary-focus fill-white',
			!active && 'text-base-content ',
		]"
	>
		<div
			class="p-2 w-full rounded-lg flex items-center gap-3"
			:class="[active ? 'bg-primary  text-white font-medium  ' : '']"
		>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	const props = defineProps<{
		active: string | Array<string>;
	}>();
	const active = computed(() =>
		Array.isArray(props.active)
			? props.active.includes(useRoute().name as string)
			: useRoute().name == props.active
	);
</script>

<style scoped></style>
