<template>
	<section class="mt-14">
		<TabGroup
			as="div"
			class="flex flex-col gap-3 mx-auto z-50 justify-center shadow-lg w-80 p-3 glass-card rounded-lg"
		>
			<TabList
				as="div"
				class="flex items-center justify-center gap-2"
			>
				<Tab
					as="div"
					:key="tab.id"
					v-for="tab in activeTabs"
					v-slot="{ selected }"
					class="focus:outline-none cursor-pointer"
				>
					<span
						class="p-2 rounded-md"
						:class="[selected && 'bg-base-100 text-base-content']"
					>
						<icon
							:name="tab.icon"
							:color="tab.color"
							size="25"
						/>
					</span>
				</Tab>
			</TabList>
			<TabPanels class="mt-2 min-h-fit justify-center flex p-2">
				<transition
					v-for="tab in activeTabs"
					:key="tab.id"
					enter-active-class="transition-all duration-300"
					enter-from-class="opacity-0 "
					leave-active-class="transition-all duration-300 "
					leave-to-class="opacity-0  "
					mode="out-in"
				>
					<TabPanel class="rounded-xl basis-full flex justify-center">
						<component
							:is="tab.component"
							:media="tab.media"
						/>
					</TabPanel>
				</transition>
			</TabPanels>
		</TabGroup>
	</section>
</template>

<script setup>
	import {
		TabGroup,
		TabList,
		Tab,
		TabPanels,
		TabPanel,
	} from "@headlessui/vue";
	import PhotosTab from "~/themes/shared/PhotosTab.vue";
	import VideosTab from "~/themes/shared/VideosTab.vue";
	import PdfTab from "~/themes/shared/PdfTab.vue";
	import YoutubeTab from "~/themes/shared/YoutubeTab.vue";
	import InstagramTab from "~/themes/shared/InstagramTab.vue";
	import FacebookTab from "~/themes/shared/FacebookTab.vue";

	const props = defineProps(["media"]);

	const { media } = toRefs(props);

	const activeTabs = computed(() =>
		tabs.filter((tab) => tab.media.value.length != 0)
	);

	const tabs = [
		{
			id: 1,
			name: "images",
			icon: "ph:image-duotone",
			color: "blue",
			media: computed(() =>
				media.value.filter((media) => media.type == "image")
			),
			component: PhotosTab,
		},
		{
			id: 2,
			name: "videos",
			icon: "ri:video-fill",
			color: "yellow",
			media: computed(() =>
				media.value.filter((media) => media.type == "video")
			),
			component: VideosTab,
		},
		{
			id: 3,
			name: "pdf",
			icon: "mingcute:pdf-fill",
			color: "red",
			media: computed(() =>
				media.value.filter((media) => media.type == "pdf")
			),
			component: PdfTab,
		},
		{
			id: 4,
			name: "youtube",
			icon: "logos:youtube-icon",
			media: computed(() =>
				media.value.filter((media) => media.type == "youtube")
			),
			component: YoutubeTab,
		},

		{
			id: 5,
			name: "facebook",
			icon: "logos:facebook",
			media: computed(() =>
				media.value.filter((media) => media.type == "facebook")
			),
			component: FacebookTab,
		},
		{
			id: 6,
			name: "instagram",
			icon: "skill-icons:instagram",
			media: computed(() =>
				media.value.filter((media) => media.type == "instagram")
			),
			component: InstagramTab,
		},
	];
</script>
