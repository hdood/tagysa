<template>
	<div class="lg:flex md:hidden hidden h-[40rem] items-center justify-center">
		<div
			class="right-0 fixed top-24 border-neutral border-[.8rem] h-[40rem] scale-75 rounded-[2.5rem] shadow-lg"
			:theme="user.theme"
		>
			<iframe
				:src="`/${user.name}`"
				class="overflow-y-scroll overflow-x-hidden h-[39rem] scale-95 w-[20rem]"
				:name="user.name"
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
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();

	const { user } = storeToRefs(userStore);
	const frame = ref(null);

	onMounted(() => {
		if (frame) {
			userStore.$state.frame = frame.value;
		}
	});
</script>
