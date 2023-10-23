<template>
	<div
		class="w-12 flex items-center item-wrapper duration-300 fill-base-content text-base-content"
		:class="[active && 'border-b-primary border-b-4', !active && '']"
	>
		<div
			class="p-2 w-full rounded-lg flex items-center gap-3"
			:class="[active ? '    font-medium justify-center ' : '']"
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
