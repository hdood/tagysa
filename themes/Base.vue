<template>
	<div class="z-999">
		<slot
			:authenticated="authenticated"
			:openAddToSpaceModal="openAddToSpaceModal"
		/>

		<AddToSpaceModal
			:show="addToSpaceModal"
			@close="addToSpaceModal = false"
			:user="user"
			:authenticated="authenticated"
		/>
	</div>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useUserStore } from "~/stores/user";
	import AddToSpaceModal from "./shared/AddToSpaceModal.vue";

	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);
	const addToSpaceModal = ref(false);

	function openAddToSpaceModal() {
		if (!authenticated.value) {
			useRouter().push("/login");
			return;
		}

		addToSpaceModal.value = true;
	}

	const authenticated = computed(() => !!user?.value?.id);

	onMounted(async () => {
		try {
			await userStore.getUser();
		} catch (error) {}
	});
</script>

<style scoped></style>
