<template>
	<div
		id="ThemeSection"
		class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-2"
	>
		<ThemePlaceholder
			v-for="theme in themes"
			:theme="theme"
			:key="theme"
		/>
	</div>
</template>

<script setup>
	import themes from "~/data/themes";
</script>

<style scoped></style>
