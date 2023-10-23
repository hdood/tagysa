<template>
	<div :class="wrapper({ type: props.type })">
		<div :class="iconClass({ type: props.type })">
			<icon
				:name="props.icon"
				size="30"
			/>
		</div>
		<div>
			<div class="text-sm">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { cva, type VariantProps } from "class-variance-authority";

	const wrapper = cva(
		[
			"min-w-full h-7 rounded-lg  flex py-6 px-2 items-center gap-4 shadow-lg cursor-pointer",
		],
		{
			variants: {
				type: {
					success: ["text-emerald-700", " bg-emerald-100 "],
					danger: ["text-red-700", " bg-red-200 "],
				},
			},
			defaultVariants: {
				type: "success",
			},
		}
	);

	const iconClass = cva([""], {
		variants: {
			type: {
				success: ["text-green-700"],
				danger: ["text-red-700"],
			},
		},
	});

	type Props = Required<VariantProps<typeof wrapper>>;

	const props = defineProps<{
		type: Props["type"];
		title: string;
		icon: string;
	}>();
</script>

<style scoped></style>
