<template>
	<div class="form-control w-full ">
		<label class="label">
			<span class="label-text">{{ props.label }}</span>
		</label>
		<div class="flex items-center flex-wrap lg:flex-nowrap">
			<input
				:id="placeholder"
				:placeholder="placeholder"
				:maxlength="String(props.max)"
				class="input input-bordered w-full  input-primary"
				:type="props.inputType"
				v-model="inputComputed"
				autocomplete="off"
			/>
			<slot name="after" />
			<icon
				v-if="props['prepend-icon']"
				:name="props['prepend-icon']"
			/>
		</div>
		<label
			class="label"
			v-if="error"
		>
			<span class="label-text-alt text-error">{{ error }}</span>
		</label>
	</div>
</template>

<script setup>
	const emit = defineEmits(["update:input"]);
	const props = defineProps([
		"input",
		"placeholder",
		"max",
		"inputType",
		"error",
		"prepend-icon",
		"inputStyle",
		"label",
		"size",
	]);
	const { input, placeholder, max, inputType, error } = toRefs(props);

	const inputComputed = computed({
		get: () => input.value,
		set: (val) => emit("update:input", val),
	});
</script>
