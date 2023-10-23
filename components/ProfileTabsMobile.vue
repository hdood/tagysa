<template>
	<TabGroup as="div" class="w-full" v-slot="{ selectedIndex }" :defaultIndex="0">
		<TabList>
			<div class="flex justify-center">
				<div class="lg:basis-9/12 basis-full flex gap-4 justify-center">
					<div class="w-full"></div>
					<div class="rounded-xl basis-full flex justify-center flex-col gap-4 max-w-sm">
						<div
							class="max-h-lg flex flex-col items-center justify-center relative bg-base-200 p-4 min-h-16 h-56 rounded-xl">
							<MobileOptionsMenu />
							<div class="avatar" @click="openCropper = true">
								<div class="w-20 rounded-full">
									<img :src="user.image" alt="Tailwind-CSS-Avatar-component" />
								</div>
							</div>
							<div class="font-bold">
								{{ user.name }}
							</div>
							<small>
								{{ user.email }}
							</small>
						</div>
						<div class="bg-base-200 p-2 rounded-lg">
							<ProfileMenu />
						</div>
					</div>
					<div class=" flex justify-center">
						<iframe ref="frame" :src="'/' + user.name" class="min-h-[40rem] min-w-[21rem]"
							frameborder="0"></iframe>
					</div>
					<TabPanels class="mt-2 min-w-[30rem] justify-center flex  bg-base-200 p-2 rounded-xl">
						<transition v-for="tab in tabs" :key="tab.id" enter-active-class="transition-all duration-300"
							leave-active-class="transition-all duration-300 " enter-from-class="opacity-0 translate-y-10"
							leave-to-class="opacity-0 -translate-y-10" mode="out-in">
							<TabPanel class="rounded-xl basis-full flex justify-center ">
								<component :is="tab.component" />
							</TabPanel>
						</transition>
					</TabPanels>
				</div>
			</div>
		</TabList>
		<CropperModal :show="openCropper" @data="image = $event" @close="openCropper = false" />
	</TabGroup>
</template>

<script setup>
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/vue';
import { useUserStore } from '~~/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { user, frame: _frame } = storeToRefs(userStore);
const image = ref({});
const openCropper = ref(false);
const frame = ref(null)

onMounted(() => {
	_frame.value = frame.value
})

const updateUserImage = async () => {
	try {
		await userStore.updateUserImage(image.value);
		await userStore.getUser();
		setTimeout(() => (openCropper.value = false), 300);
	} catch (error) {
		openCropper.value = false;
		alert(error);
	}
};

watch(
	() => image.value,
	async () => await updateUserImage(),
);

const tabs = [
	{
		id: 1,
		name: 'Bio',
		icon: 'mdi:user',
		component: defineAsyncComponent(() => import('./BioSection.vue')),
	},
	{
		id: 2,
		name: 'Contact',
		icon: 'teenyicons:contact-solid',
		component: defineAsyncComponent(() => import('./ContactSection.vue')),
	},
	{
		id: 3,
		name: 'Links',
		icon: 'tabler:link',
		component: defineAsyncComponent(() => import('./LinksSection.vue')),
	},
	
	// {
	// 	id: 5,
	// 	name: 'Media',
	// 	icon: 'material-symbols:media-link',
	// 	component: defineAsyncComponent(() => import('./MediaSection.vue')),
	// },

	{
		id: 5,
		name: 'Services',
		icon: 'grommet-icons:services',
		component: defineAsyncComponent(() => import('./ServiceTab.vue')),
	},
	{
		id: 6,
		name: 'Testimonials',
		icon: 'dashicons:testimonial',
		component: defineAsyncComponent(() => import('./PersonalTestimonialsSection.vue')),
	},
];
</script>
