import axios from "~~/plugins/axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

const app = useNuxtApp();
const $axios = axios(app).provide.axios;

class LinksStore {
	all = ref([]);

	addLink = async (name, url, icon, order, text) => {
		await $axios.post("/api/links", {
			name,
			url,
			icon,
			order,
			text,
		});

		useUserStore().refreshFrame();
	};
	getAllLinks = async () => {
		let res = await $axios.get("/api/links");
		this.all.value = res.data;
	};
	deleteLink = async (id) => {
		await $axios.delete(`/api/links/${id}`);
	};

	reorder = async () => {
		const newOrder = Array.from(this.all.value, (item, index) => ({
			id: item.id,
			order: index,
		}));

		$axios.post("/api/links/reorder", {
			links: JSON.stringify(newOrder),
		});

		useUserStore().refreshFrame();
	};

	updateLink = async (id, name, url) => {
		await $axios.patch(`/api/links/${id}`, {
			name: name,
			url: url,
		});
	};
}

export const useLinksStore = defineStore("links", () => new LinksStore());
