import { defineStore } from "pinia";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

class SocialStore {
	error = ref(false);
	googleLogin = async (payload) => {

		this.error.value = false;

		try {
			await $axios.post("/login/google", {
				client_id: payload.clientId,
				credential: payload.credential,
			});

			return true;
		} catch (error) {
			if (error?.response?.data?.error == "user not signed up") {
				return false;
			}
		}
	};

	googleRegister = async (payload) => {
		
		this.error.value = false;

		try {
			await $axios.post("/register/google", {
				client_id: payload.clientId,
				credential: payload.credential,
			});

			return true;
		} catch (error) {
			return false;
		}
	};
}

export const useSocialStore = defineStore("social", () => new SocialStore());
