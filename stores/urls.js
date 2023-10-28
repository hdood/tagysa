import axios from "~~/plugins/axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

const app = useNuxtApp();
const $axios = axios(app).provide.axios;

class UrlsStore {
	all = ref([]);

	addLink = async (name, link, order, profileId) => {
		await $axios.post("/api/urls/" + profileId, {
			name,
			link,
			order,
		});

		useUserStore().refreshFrame();
	};
	getAllLinks = async (profileId) => {
		let res = await $axios.get("/api/urls/" + profileId);
		this.all.value = res.data;
	};

	deleteLink = async (id) => {
		await $axios.delete(`/api/urls/${id}`);
	};

	reorder = async () => {
		const newOrder = Array.from(this.all.value, (item, index) => ({
			id: item.id,
			order: index,
		}));

		$axios.post("/api/urls/reorder", {
			urls: JSON.stringify(newOrder),
		});

		useUserStore().refreshFrame();
	};

	updateLink = async (id, name, url) => {
		await $axios.patch(`/api/urls/${id}`, {
			name: name,
			url: url,
		});
	};
}

export const useUrlsStore = defineStore("urls", () => new UrlsStore());
