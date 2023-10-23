<template>
	<div>
		<div @click="openFileExplorer">
			<slot />
		</div>
		<input
			type="file"
			name=""
			class="hidden"
			id=""
			@change="emitValue"
			ref="input"
		/>
	</div>
</template>

<script setup>
	const props = defineProps(["modelValue"]);
	const emit = defineEmits(["update:modelValue"]);
	const input = ref(null);

	function openFileExplorer() {
		input?.value?.click?.();
	}

	function emitValue(e) {
		model.value = e.target.files[0];
	}

	const model = computed({
		get: () => props.modelValue,
		set: (value) => emit("update:modelValue", value),
	});
</script>

<style></style>
