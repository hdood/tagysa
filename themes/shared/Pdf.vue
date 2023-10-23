<template>
	<object
		:data="data?.url"
		type="application/pdf"
		class="max-w-[17rem] h-96"
	>
		<iframe
			:src="`https://docs.google.com/viewer?url=${data?.url}&embedded=true`"
			frameborder="0"
			class="lg:hidden md:hidden block max-w-[17rem] h-96"
		></iframe>
	</object>
</template>

<script setup lang="ts">
	const props = defineProps(["pdf"]);

	const data = props.pdf.data;
</script>

<style scoped></style>
