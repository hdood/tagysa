<template>
	<div
		:class="[active && 'ring-8 ring-success']"
		class="rounded-lg relative overflow-hidden shadow-lg scale-90"
	>
		<div
			class="w-60 space-y-4 min-h-16 h-96 rounded-lg flex flex-col items-center justify-center shadow shadow-primary relative"
			:data-theme="props.theme.theme"
		>
			<img
				:src="backgroundBaseURl + props.theme.background"
				class="absolute top-0 left-0 w-60 h-full"
				loading="lazy"
				v-if="props.theme?.background"
			/>
			<div class="text-xl uppercase font-medium z-10 text-base-content">
				{{ props.theme.name }}
			</div>
			<div
				class="h-10 w-40 btn z-10"
				:class="[active ? 'btn-success' : 'btn-primary']"
				@click="applyTheme"
			>
				{{ active ? "applied" : "select" }}
			</div>
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useUserStore } from "~/stores/user";
	const { updateTheme, getUser } = useUserStore();
	const { user } = storeToRefs(useUserStore());

	const props = defineProps(["theme"]);
	const backgroundBaseURl = import.meta.env.VITE_API_URL + "/backgrounds/";

	const active = computed(() => props.theme.name == user.value.theme);

	async function applyTheme() {
		await updateTheme(props.theme.name);
		await getUser();
	}
</script>

<style scoped></style>
