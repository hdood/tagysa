import { useUserStore } from "~~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const userStore = useUserStore();

	try {
		await userStore.getUser();
		return navigateTo("/admin");
	} catch (error) {
		return true;
	}
});
