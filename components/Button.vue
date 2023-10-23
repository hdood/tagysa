<template>
	<button :class="button({ type: props.type })">
		<Icon
			v-if="loading"
			name="eos-icons:loading"
			size="25"
		/>
		<div v-else>
			<component
				v-if="props.icon"
				:is="props.icon"
			/>
			<span>
				<slot />
			</span>
		</div>
	</button>
</template>

<script setup lang="ts">
	import { cva, type VariantProps } from "class-variance-authority";

	const button = cva(["rounded-md  focus:outline-none hover:shadow"], {
		variants: {
			type: {
				disabled: ["btn btn-disabled cursor-not-allowed"],
				"danger-light": [
					"bg-gradient-to-r from-red-200 to-red-300  dark:from-red-600 dark:to-red-700 dark:fill-red-100  fill-red-700 text-red-700  dark:text-white  active:translate-y-1 focus:ring-4 focus:ring-rose-300 transition-all",
				],
				danger: "btn btn-error",
				success: "btn btn-success text-success-content",
				"light-success":
					"bg-gradient-to-r from-green-200 to-green-300  dark:from-green-600 dark:to-green-700 dark:fill-emerald-100 fill-green-600 text-green-600 dark:text-white  active:translate-y-1 focus:ring-4 focus:ring-emerald-300 transition-all",
				info: "btn btn-info",
				primary: "btn btn-primary text-white fill-white",

				"card-danger":
					"bg-white fill-white active:translate-y-1 transition-all text-red-900 focus:ring-indigo-300 ",
				"card-info":
					"bg-white fill-white active:translate-y-1 transition-all text-blue-900 focus:ring-indigo-300 ",
				"primary-content": "btn btn-primary-content text-primary",
				accent: "btn btn-accent",
			},
		},
	});
	type Props = Required<VariantProps<typeof button>>;

	const props = defineProps<{
		type: Props["type"];
		icon?: string;
		loading?: boolean;
	}>();
</script>

<style scoped></style>
