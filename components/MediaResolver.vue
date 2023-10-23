<template>
	<component
		:is="getMediaComponent(props.media.type)"
		:media="props.media"
	/>
</template>

<script setup>
	const props = defineProps(["media"]);

	function getMediaComponent(_name) {
		const name = _name.charAt(0).toUpperCase() + _name.slice(1);

		try {
			const component = defineAsyncComponent(() =>
				import(`~/components/media/${name}.vue`)
			);
			return component;
		} catch (error) {
			return {
				template: `could not resolve ${name}.vue are you sure this component exists`,
			};
		}
	}
</script>
