import { defineStore } from "pinia";
import axios from "~~/plugins/axios";
import { useUserStore } from "./user";
import { useNotificationsStore } from "./notifications";

const app = useNuxtApp();
const $axios = axios(app).provide.axios;

class ServicesStore {
  services = ref([]);
  store = async (name, url, description, image, price) => {
    const { successNotification, errorNotification } = useNotificationsStore();

    const data = new FormData();
    data.append("name", name);
    data.append("url", url);
    data.append("description", description);
    data.append("image", image);
    data.append("order", this.services.value.length);
    data.append("price", price);

    try {
      const response = $axios.post("/api/services", data);
      successNotification("Service added successfully");

      return true;
    } catch (error) {
      errorNotification(error.response.data.error);
    }
  };

  update = async (id, name, url, description, image, price) => {
    const { successNotification, errorNotification } = useNotificationsStore();

    const data = new FormData();
    data.append("name", name);
    data.append("url", url);
    data.append("description", description);
    data.append("image", image);
    data.append("order", this.services.value.length);
    data.append("price", price);

    try {
      const response = $axios.post(`/api/services/edit/${id}`, data);
      successNotification("Service updated successfully");

      return true;
    } catch (error) {
      errorNotification(error.response.data.error);
    }
  };

  fetchAll = async () => {
    try {
      const response = await $axios.get("/api/services");
      this.services.value = response.data.data;
    } catch (error) {
      errorNotification("failed to fetch services");
    }
  };

  reorder = async () => {
    const newOrder = Array.from(this.services.value, (item, index) => ({
      id: item.id,
      order: index,
    }));

    $axios.post("/api/services/reorder", {
      services: JSON.stringify(newOrder),
    });
    useUserStore().refreshFrame();
  };

  destroy = async (id) => {
    const { errorNotification } = useNotificationsStore();
    try {
      await $axios.delete(`/api/services/${id}`);
    } catch (error) {
      errorNotification("failed to delete service");
    }
  };

  storeTestimonial = async (serviceId, testimonial) => {
    const { errorNotification } = useNotificationsStore();
    const data = new FormData();
    data.append("service_id", serviceId);
    data.append("user_name", testimonial.userName);
    data.append("content", testimonial.content);
    data.append("image", testimonial.image);

    try {
      await $axios.post("/api/testimonials", data);
    } catch (error) {
      errorNotification("something went wrong please try again!");
    }
  };
  destroyTestimonial = async (id) => {
    const { errorNotification } = useNotificationsStore();
    try {
      await $axios.delete(`/api/testimonials/${id}`);
    } catch (error) {
      errorNotification("something went wrong please try again!");
    }
  };
}

export const useServicesStore = defineStore(
  "services",
  () => new ServicesStore()
);
