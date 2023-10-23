<template>
	<section class="z-50">
		<div
			class="mx-auto backdrop-blur-lg rounded-md p-1 mt-10"
			v-if="videos.length != 0"
		>
			<div class="text-3xl mt-10">Videos</div>
			<div
				class="px-2 mt-5"
				v-motion
				:initial="{ opacity: 0, y: 100 }"
				:visible="{
					opacity: 1,
					y: 0,
					transition: {
						duration: 600,
						type: 'keyframes',
						ease: 'easeOut',
					},
				}"
			>
				<Splide
					:has-track="false"
					:options="{
						perPage: 1,
						rewind: true,
						focus: 'center',
						classes: {
							page: 'splide__pagination__page  bg-indigo-600', // each button
						},
					}"
					tag="div"
					class="lg:w-[40rem] w-[20rem] mx-auto"
					aria-label="Testimonials"
				>
					<SplideTrack>
						<SplideSlide
							v-for="video in videos"
							:key="video.id"
						>
							<video
								controls="controls autoplay"
								:src="video.data.url"
								alt=""
								class="rounded-md"
							/>
						</SplideSlide>
					</SplideTrack>
					<ul class="splide__pagination absolute"></ul>
				</Splide>
			</div>
		</div>

		<div
			class="mx-auto backdrop-blur-lg rounded-md p-1 mt-10"
			v-if="images.length != 0"
		>
			<div class="w-full text-left text-3xl">Photos</div>
			<div
				class="mt-5"
				v-motion
				:initial="{ opacity: 0, y: 100 }"
				:visible="{
					opacity: 1,
					y: 0,
					transition: {
						duration: 600,
						type: 'keyframes',
						ease: 'easeOut',
					},
				}"
			>
				<Splide
					:has-track="false"
					:options="{
						perPage: 1,
						rewind: true,
						focus: 'center',
						classes: {
							page: 'splide__pagination__page  bg-indigo-600', // each button
						},
					}"
					tag="div"
					class="w-[20rem] mx-auto p-4 backdrop-blur-lg rounded-md"
					aria-label="Testimonials"
				>
					<SplideTrack>
						<SplideSlide
							v-for="image in images"
							:key="image.id"
							tag="div"
							class="flex justify-center"
						>
							<img
								:src="image.data.url"
								alt=""
								class="rounded-md h-72"
							/>
						</SplideSlide>
					</SplideTrack>
					<ul class="splide__pagination absolute"></ul>
				</Splide>
			</div>
		</div>

		<!-- PDFs-->
		<div
			class="mx-auto backdrop-blur-lg rounded-md p-1 mt-10"
			v-if="pdfs.length != 0"
		>
			<div class="text-left text-3xl">Catalogue</div>
			<div
				class="mt-5"
				v-motion
				:initial="{ opacity: 0, y: 100 }"
				:visible="{
					opacity: 1,
					y: 0,
					transition: {
						duration: 600,
						type: 'keyframes',
						ease: 'easeOut',
					},
				}"
			>
				<Splide
					:has-track="false"
					:options="{
						perPage: 1,
						rewind: true,
						focus: 'center',
						classes: {
							page: 'splide__pagination__page  bg-indigo-600', // each button
						},
					}"
					tag="div"
					class="w-[20rem] mx-auto p-4 backdrop-blur-lg rounded-md"
					aria-label="Testimonials"
				>
					<SplideTrack>
						<SplideSlide
							v-for="pdf in pdfs"
							:key="pdf.id"
							tag="div"
							class="flex justify-center"
						>
							<Pdf :pdf="pdf" />
						</SplideSlide>
					</SplideTrack>
					<ul class="splide__pagination absolute"></ul>
				</Splide>
			</div>
		</div>

		<div
			class="mx-auto backdrop-blur-lg rounded-md p-1 mt-10"
			v-if="youtubeVideos.length != 0"
		>
			<div class="w-full text-left text-3xl mt-10">Youtube</div>
			<div
				class="px-2 mt-5"
				v-motion
				:initial="{ opacity: 0, y: 100 }"
				:visible="{
					opacity: 1,
					y: 0,
					transition: {
						duration: 600,
						type: 'keyframes',
						ease: 'easeOut',
					},
				}"
			>
				<Splide
					:has-track="false"
					:options="{
						perPage: 1,
						rewind: true,
						focus: 'center',
						classes: {
							page: 'splide__pagination__page  bg-indigo-600', // each button
						},
					}"
					tag="div"
					class="w-[20rem] mx-auto p-4 backdrop-blur-lg rounded-md"
					aria-label="Testimonials"
				>
					<SplideTrack>
						<SplideSlide
							v-for="video in youtubeVideos"
							:key="video.id"
						>
							<YoutubeVideo :media="video" />
						</SplideSlide>
					</SplideTrack>
					<ul class="splide__pagination absolute"></ul>
				</Splide>
			</div>
		</div>

		<div
			class="mx-auto backdrop-blur-lg rounded-md p-1 mt-10"
			v-if="facebook.length != 0"
		>
			<div class="w-full text-left text-3xl mt-10">Facebook</div>
			<div
				class="px-2 mt-5"
				v-motion
				:initial="{ opacity: 0, y: 100 }"
				:visible="{
					opacity: 1,
					y: 0,
					transition: {
						duration: 600,
						type: 'keyframes',
						ease: 'easeOut',
					},
				}"
			>
				<Splide
					:has-track="false"
					:options="{
						perPage: 1,
						rewind: true,
						focus: 'center',
						classes: {
							page: 'splide__pagination__page  bg-indigo-600', // each button
						},
					}"
					tag="div"
					class="w-[20rem] mx-auto p-4 backdrop-blur-lg rounded-md"
					aria-label="Testimonials"
				>
					<SplideTrack>
						<SplideSlide
							v-for="post in facebook"
							:key="post.id"
						>
							<FacebookPost :media="post" />
						</SplideSlide>
					</SplideTrack>
					<ul class="splide__pagination absolute"></ul>
				</Splide>
			</div>
		</div>

		<div
			class="mx-auto backdrop-blur-lg rounded-md p-1 mt-10"
			v-if="instagram.length != 0"
		>
			<div class="w-full text-left text-3xl mt-10">Instagram</div>
			<div
				class="px-2 mt-5"
				v-motion
				:initial="{ opacity: 0, y: 100 }"
				:visible="{
					opacity: 1,
					y: 0,
					transition: {
						duration: 600,
						type: 'keyframes',
						ease: 'easeOut',
					},
				}"
			>
				<Splide
					:has-track="false"
					:options="{
						perPage: 1,
						rewind: true,
						focus: 'center',
						classes: {
							page: 'splide__pagination__page  bg-indigo-600', // each button
						},
					}"
					tag="div"
					class="w-[20rem] mx-auto p-4 backdrop-blur-lg rounded-md"
					aria-label="Testimonials"
				>
					<SplideTrack>
						<SplideSlide
							v-for="post in instagram"
							:key="post.id"
						>
							<InstagramPost :media="post" />
						</SplideSlide>
					</SplideTrack>
					<ul class="splide__pagination absolute"></ul>
				</Splide>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
	import "@splidejs/vue-splide/css/skyblue";
	import YoutubeVideo from "../shared/YoutubeVideo.vue";
	import FacebookPost from "../shared/FacebookPost.vue";
	import InstagramPost from "../shared/InstagramPost.vue";
	import Pdf from "../shared/Pdf.vue";
	const props = defineProps(["medias"]);
	const { medias } = toRefs(props);

	const videos = computed(() =>
		medias.value.filter((media) => media.type == "video")
	);

	const images = computed(() =>
		medias.value.filter((media) => media.type == "image")
	);

	const pdfs = computed(() =>
		medias.value.filter((media) => media.type == "pdf")
	);

	const youtubeVideos = computed(() =>
		medias.value.filter((media) => media.type == "youtube")
	);

	const facebook = computed(() =>
		medias.value.filter((media) => media.type == "facebook")
	);

	const instagram = computed(() =>
		medias.value.filter((media) => media.type == "instagram")
	);
</script>

<style scoped></style>
