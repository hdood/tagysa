<template>
	<Head>
		<title>{{ user.name }}</title>
	</Head>
	<img
		v-if="theme?.background"
		:src="backgroundBaseURl + theme?.background"
		class="fixed h-full w-full"
	/>

	<Base v-slot="{ openAddToSpaceModal }">
		<div class="pb-20 flex items-center flex-col overflow-hidden main z-50">
			<div
				class="h-full flex flex-col items-center bg-cover bg-no-repeat w-full"
			>
				<TopBar />
				<div
					class="lg:h-[14rem] lg:w-[50rem] mb-14 w-full h-40 rounded-lg relative"
				>
					<div
						class="absolute lg:-bottom-16 -bottom-14 right-0 left-0 mx-auto outline rounded-full outline-white lg:h-36 lg:w-36 w-32 h-32"
						v-motion-pop
					>
						<img
							class="lg:h-36 lg:w-36 w-32 h-32 rounded-full transition-all"
							:src="user.image"
							alt=""
						/>
					</div>
					<div></div>
				</div>
				<div
					class="font-medium text-2xl mt-6 z-50"
					v-motion-fade
				>
					{{ user.full_name }}
				</div>
				<div class="text-sm mt-2 z-50">
					{{ user.designation }}
				</div>
				<div
					class="font-medium text-2xl mt-6 z-50 flex items-center gap-12"
				>
					<div
						class="flex flex-col gap-1 items-center justify-center"
					>
						<span class="">
							{{ user.views }}
						</span>
						<small class="text-sm">Views</small>
					</div>
					<div
						class="flex flex-col gap-1 items-center justify-center"
					>
						<span class="">
							{{ user.contact_savers }}
						</span>
						<small class="text-sm">Contacts</small>
					</div>
					<Button
						type="primary"
						@click="openAddToSpaceModal"
					>
						<icon
							size="25"
							name="mdi:user-add"
						/>
					</Button>
				</div>
				<div class="mt-4 text-center lg:w-80 px-6 z-50">
					{{ user.bio }}
				</div>
				<div
					class="flex gap-4 mx-auto w-64 mt-4 justify-center flex-wrap p-2"
					v-motion-fade
				>
					<a
						class="flex items-center rounded-md p-2 cursor-pointer text-primary-content glass-card"
						:href="user.website"
						target="_blank"
						v-if="user.website && user.visibility.website"
					>
						<Icon
							name="ri:earth-fill"
							size="30"
						/>
					</a>
					<a
						class="flex items-center rounded-md p-2 cursor-pointer text-primary-content glass-card"
						:href="`https://www.google.com/maps/search/?api=1&query=${user.address}`"
						target="_blank"
						v-if="user.address"
					>
						<Icon
							name="logos:google-maps"
							size="30"
						/>
					</a>
					<a
						v-for="link in user.links"
						:href="link.url"
						target="_blank"
						class="flex items-center rounded-md p-2 cursor-pointer text-primary-content glass-card"
						:key="link.id"
					>
						<icon
							:name="link.icon"
							size="30"
						/>
					</a>
				</div>
				<a
					:href="`mailto:${user.email}`"
					class="shadow-lg flex flex-col items-center test-center px-8 py-3 gap-2 mt-8 bg-transparent rounded-md z-50 glass-card min-w-[21rem]"
					v-if="user.visibility.email && user.email"
					v-motion-fade
				>
					<div class="text-base-content">
						<Icon
							name="ic:baseline-email"
							size="35"
						/>
					</div>
					<div class="text-center flex flex-col items-center gap-1">
						<div class="text-neutral-700 text-s">
							E-mail address
						</div>
						<div class="text-xl font-medium">
							{{ user.email }}
						</div>
					</div>
				</a>
				<div
					class="shadow-lg flex flex-col items-center test-center px-8 py-3 gap-2 mt-8 bg-transparent z-50 rounded-md glass-card min-w-[21rem] cursor-pointer"
					v-if="user.visibility.phone && user.phone"
					@click="showPhoneActions = true"
				>
					<div class="text-base-content">
						<Icon
							name="bi:phone-fill"
							size="35"
						/>
					</div>
					<div class="text-center flex flex-col items-center gap-1">
						<div class="text-neutral-700 text-s">Phone</div>
						<div class="text-xl font-medium">
							+{{ user.country_code }}
							{{ user.phone }}
						</div>
					</div>
				</div>
				<div v-if="user.services.length != 0">
					<div
						class="card glass-card shadow-md mt-8 lg:w-96 w-72 p-2 text-base-content"
						v-for="(service, index) in user.services"
						:key="service.id"
						v-motion
						:initial="{
							opacity: 0,
							x: index % 2 == 0 ? 100 : -100,
						}"
						:visible="{
							opacity: 1,
							x: 0,
							transition: {
								duration: 600,
								type: 'keyframes',
								ease: 'easeOut',
							},
						}"
					>
						<figure>
							<img
								:src="service.image"
								alt="Shoes"
							/>
						</figure>
						<div class="card-body">
							<h2 class="card-title">
								{{ service.name }}
							</h2>
							<div
								class="badge badge-secondary"
								v-if="service.price != 0"
							>
								{{ service.price }}
							</div>
							<p>{{ service.description }}</p>
						</div>
						<!-- <div
							class="card-actions justify-end"
							v-if="service.url"
						>
							<NuxtLink :to="service.url">
								<Button
									type="primary"
									class="px-4 h-10"
									>Visit site</Button
								>
							</NuxtLink>
						</div> -->
					</div>
				</div>
				<MediaGlass
					v-if="user.media.length != 0"
					:media="user.media"
				/>
				<!-- <MediaSection
					:medias="user.media"
					v-if="user.media.length != 0"
				/> -->
				<TestimonialsSection
					:testimonials="user.testimonials"
					v-if="user.testimonials.length != 0"
				/>
			</div>
			<RouterLink
				to="/admin/nfc"
				class="z-50 mt-7"
			>
				<div
					class="text-2xl z-50 rounded-lg px-4 py-1 glass-card animate-bounce"
				>
					Get a your card now
				</div>
			</RouterLink>
			<ShareModal
				:show="showShareModal"
				@close="showShareModal = false"
				:user="user"
			/>
			<PhoneActions
				:show="showPhoneActions"
				@close="showPhoneActions = false"
				:user="user"
			/>
		</div>
	</Base>
</template>

<script setup>
	import MediaSection from "./MediaSection.vue";
	import MediaGlass from "~/themes/shared/MediaGlass.vue";
	import TestimonialsSection from "./TestimonialsSection.vue";
	import TopBar from "~/themes/shared/TopBar.vue";
	import PhoneActions from "~/themes/shared/PhoneActions.vue";
	import Base from "../Base.vue";

	const props = defineProps(["user", "theme"]);
	const { user, theme } = toRefs(props);
	const showShareModal = ref(false);
	const showPhoneActions = ref(false);

	const backgroundBaseURl = import.meta.env.VITE_API_URL + "/backgrounds/";
</script>

<style scoped></style>
