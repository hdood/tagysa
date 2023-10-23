<template>
	<div class="lg:w-96 mx-auto lg:mx-0 relative">
		<TextInput
			placeholder="Search for a user"
			v-model:input="term"
			:rounded="true"
			inputType="text"
			:max="25"
		/>
		<transition
			enter-active-class="transition-all"
			leave-active-class="transition-all"
			enter-from-class="opacity-0 translate-y-4 scale-50"
			leave-to-class="opacity-0 translate-y-4"
		>
			<div
				v-if="term != ''"
				class="w-full top-14 rounded-lg h-96 bg-white absolute z-50 border p-2"
			>
				<RouterLink
					v-for="user in users"
					:to="'/' + user.name"
					class="flex items-center gap-4 p-1 rounded-lg border"
					:key="user.id"
				>
					<img
						:src="user.image"
						class="w-14 h-14 rounded-lg"
						alt=""
					/>
					<div class="">
						<span class="block">{{ user.name }}</span>

						<span class="opacity-60 text-sm">
							{{ user.email }}
						</span>
					</div>
				</RouterLink>
			</div>
		</transition>
	</div>
</template>

<script setup>
	import TextInput from "./TextInput.vue";
	import axios from "~~/plugins/axios";

	const $axios = axios().provide.axios;

	const term = ref("");
	const users = ref([]);

	const loading = ref(false);

	const search = useDebounce(async () => {
		loading.value = true;
		users.value = [];
		try {
			const response = await $axios.get(
				`/api/users/search/${term.value}`
			);
			users.value = response.data.data;
		} catch (error) {
			console.error("something wend wrong", error);
		}
		loading.value = false;
	}, 1000);

	watch(term, (value) => search());
</script>

<style scoped></style>
