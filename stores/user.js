import { defineStore } from "pinia";
import { useNotificationsStore } from "./notifications";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

class UserStore {
	user = ref({});
	colors = ref(null);
	frame = ref(null);
	error = ref({});
	frameLoading = ref(false);

	constructor() {
		const { errorNotification } = useNotificationsStore();
		this.errorNotification = errorNotification;
	}

	getCSRFCookie = async () => await $axios.get("/sanctum/csrf-cookie");

	getUser = async () => {
		let res = await $axios.get("/api/users");
		this.user.value = res.data;
	};

	refreshFrame = () => {
		try {
			if (!this.frame.value) return;
			this.frame?.value?.contentWindow?.location?.reload?.();
			this.frame.value.contentWindow.location.href =
				this.frame?.value?.src;
		} catch (error) {}
	};

	updateUserImage = async (data) => {
		await $axios.post("/api/user-image", data);
	};

	updateUserCoverImage = async (data) => {
		await $axios.post("/api/user-cover-image", data);
	};

	updateUserDetails = async (
		name,
		bio,
		phone,
		phoneVisibility,
		countryCode,
		address,
		website
	) => {
		await $axios.patch(`/api/users/${this.$state.id}`, {
			name,
			bio,
			phone: phone,
			phone_visibility: phoneVisibility,
			country_code: countryCode,
			address,
			website,
		});
	};

	toggleVisibility = async (field) => {
		try {
			const response = await $axios.patch(
				`/api/users/visibility/${field}`
			);
			this.getUser();
		} catch (error) {
			this.errorNotification(`filed to toggle ${field} visibility`);
		}
	};
	toggleProfileVisibility = async () => {
		try {
			const response = await $axios.patch(
				`/api/users/profile-visibility`
			);
			this.getUser();
		} catch (error) {
			this.errorNotification(`filed to toggle profile visibility`);
		}
	};

	updateTheme = async (theme) => {
		const { errorNotification, successNotification } =
			useNotificationsStore();
		try {
			await $axios(`/api/user-theme/${theme}`);

			successNotification(`${theme} theme was set successfully`);
		} catch (error) {
			errorNotification(`failed to set ${theme} theme`);
		}
	};
}

export const useUserStore = defineStore("user", () => new UserStore());
