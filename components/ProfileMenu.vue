<template>
	<div
		class="gap-3 mt-5 py-2 w-full flex flex-col justify-center items-center min-w-fit"
	>
		<Tab
			as="div"
			:key="tab.id"
			v-for="tab in tabs"
			class="focus:outline-none px-2 w-full flex justify-center min-w-[20rem]"
			v-slot="{ selected }"
		>
			<button
				:class="[
					selected ? '' : 'text-neutral   border-primary border-2',
				]"
				class="btn btn-primary text-white shadow rounded-lg w-3/4 text-sm flex text-center items-center justify-between gap-2 font-medium cursor-pointer"
			>
				<div class="flex items-center gap-2">
					<icon
						:name="tab.icon"
						size="25"
						class="hidden lg:block md:block"
					/>
					<span>{{ tab.name }}</span>
				</div>
				<div>
					<icon
						name="zondicons:cheveron-right"
						size="25"
						class="hidden lg:block md:block"
					/>
				</div>
			</button>
		</Tab>
	</div>
</template>

<script setup>
	import { TabList, Tab } from "@headlessui/vue";

	const tabs = [
		{
			id: 1,
			name: "Bio",
			icon: "mdi:user",
			component: defineAsyncComponent(() => import("./BioSection.vue")),
		},
		{
			id: 2,
			name: "Contact",
			icon: "teenyicons:contact-solid",
			component: defineAsyncComponent(() =>
				import("./ContactSection.vue")
			),
		},
		{
			id: 3,
			name: "Links",
			icon: "tabler:link",
			component: defineAsyncComponent(() => import("./LinksSection.vue")),
		},
		// {
		// 	id: 5,
		// 	name: "Media",
		// 	icon: "material-symbols:media-link",
		// 	component: defineAsyncComponent(() => import("./MediaSection.vue")),
		// },

		{
			id: 5,
			name: "Services",
			icon: "grommet-icons:services",
			component: defineAsyncComponent(() => import("./ServiceTab.vue")),
		},
		{
			id: 6,
			name: "Testimonials",
			icon: "dashicons:testimonial",
			component: defineAsyncComponent(() =>
				import("./PersonalTestimonialsSection.vue")
			),
		},
	];
</script>

<style scoped></style>
