import axios from "~~/plugins/axios";
import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/user";

const app = useNuxtApp();
const $axios = axios(app).provide.axios;

class MediaStore {
	media = ref([]);
	fetchMedia = async (userId) => {
		try {
			const response = await $axios.get(`/api/media/${userId}`);
			this.media.value = response.data;
		} catch (error) {
			console.error(error);
		}
	};

	deleteMedia = async (mediaId) => {
		const userStore = useUserStore();

		try {
			await $axios.delete(`/api/media/${mediaId}`);
			this.fetchMedia(userStore.user.value.id);
		} catch (error) {
			console.error(error);
		}
	};

	reorder = async () => {
		const newOrder = Array.from(this.media.value, (item, index) => ({
			id: item.id,
			order: index,
		}));

		$axios.post("/api/media/reorder", {
			media: JSON.stringify(newOrder),
		});

		useUserStore().refreshFrame();
	};

	deleteFileMedia = async (mediaId) => {
		const userStore = useUserStore();

		const { user } = storeToRefs(userStore);

		try {
			await $axios.delete(`/api/media/file/${mediaId}`);

			if (user?.value?.id) await this.fetchMedia(user.value.id);
			else {
				await this.fetchMedia(user.id);
			}
		} catch (error) {
			console.error(error);
		}
	};
}

export const useMediaStore = defineStore("media", () => new MediaStore());
