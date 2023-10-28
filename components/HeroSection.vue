<template>
	<div class="hero min-h-screen bg-base-200 mt-20 lg:mt-10">
		<div class="hero-content flex-col lg:flex-row-reverse w-10/12 items-center ">
			<div class="basis-1/2 flex   justify-center">
				<div
					class="max-w-fit border-neutral border-[.8rem] scale-90 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-300"
				>
					<iframe
						:src="`/user/tagysa?landing=true&theme=${theme}`"
						class="overflow-y-scroll overflow-x-hidden h-[39rem] scale-95 w-[20rem]"
						ref="frame"
					>
					</iframe>

					<!-- power button -->
					<div
						class="w-2 h-10 rounded-sm absolute bg-neutral top-20 -left-4"
					></div>
					<!-- volume buttons-->
					<div
						class="w-2 h-14 rounded-sm absolute bg-neutral top-36 -left-4"
					></div>
					<div
						class="w-2 h-14 rounded-sm absolute bg-neutral top-52 -left-4"
					></div>
					<!-- right button -->
					<div
						class="w-2 h-24 rounded-sm absolute bg-neutral top-40 -right-4"
					></div>
				</div>
			</div>
			<div class="basis-1/2">
				<h1 class="text-5xl font-bold">
					One Card, Endless Possibilities: Explore Your Profile!
				</h1>
				<p class="py-6">
					Empowering Connections: Unleash Your Profile's Full
					Potential with the Magic of a Single NFC Card!
				</p>
				<button class="btn btn-primary">Get Started</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	const theme = ref("light");
</script>

<style scoped></style>
