import { defineStore } from "pinia";
import { useNotificationsStore } from "./notifications";

import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

class TestimonialsStore {
	testimonials = ref([]);

	store = async (testimonial) => {
		const { successNotification, errorNotification } =
			useNotificationsStore();

		const data = new FormData();

		data.append("user_name", testimonial.userName);
		data.append("content", testimonial.content);
		data.append("image", testimonial.image);
		data.append("rating", testimonial.rating);

		try {
			await $axios.post("/api/personal-testimonials", data);
			successNotification("testimonial added successfully");
		} catch (error) {
			errorNotification("failed to add testimonial");
		}
	};

	destroy = async (id) => {
		const { successNotification, errorNotification } =
			useNotificationsStore();
		try {
			await $axios.delete(`/api/personal-testimonials/${id}`);
			successNotification("testimonial deleted successfully");
		} catch (error) {
			errorNotification("failed to delete testimonial");
		}
	};

	fetchAll = async () => {
		const { errorNotification } = useNotificationsStore();
		try {
			const response = await $axios.get("/api/personal-testimonials");
			this.testimonials.value = response.data.data;
		} catch (error) {
			errorNotification("failed to fetch testimonials");
		}
	};
}

export const useTestimonialsStore = defineStore(
	"testimonials",
	() => new TestimonialsStore()
);
