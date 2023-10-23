<template>
	<Media
		@delete="mediaStore.deleteFileMedia(props.media.id)"
		:media="props.media"
	>
		<object
			:data="data?.url"
			type="application/pdf"
			width="100%"
			height="500px"
		>
			<a
				:href="data?.url"
				target="_blank"
				class="flex items-center gap-4 ml-8"
			>
				<icon
					name="bi:file-pdf-fill"
					color="red"
					size="30"
				/>
				<span>
					{{ data?.title }}
				</span>
			</a>
		</object>
	</Media>
</template>

<script setup>
	import { useMediaStore } from "~/stores/media";
	const mediaStore = useMediaStore();

	const props = defineProps(["media"]);

	const data = JSON.parse(props.media.data);
</script>
