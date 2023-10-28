<template>
	<div class="relative ">
		<img v-if="theme == 'halloween'" class="w-24 relative " src="~/assets/dark_logo.png" alt="">
		<img v-else class="w-24 relative " src="~/assets/light_logo.png" alt="">
	</div>
</template>

<script setup>
import { theme } from '~/data/theme';
</script>
