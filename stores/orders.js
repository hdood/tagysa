import { defineStore } from "pinia";
import axios from "~~/plugins/axios";
import { useNotificationsStore } from "./notifications";
const $axios = axios().provide.axios;

class OrdersStore {
  orders = ref([]);

  fetchAll = async () => {
    const { errorNotification } = useNotificationsStore();
    try {
      const { data } = await $axios("/api/orders");
      this.orders.value = data.data;
    } catch (error) {
      errorNotification("failed to fetch orders");
    }
  };

  cancel = async (id) => {
    const { errorNotification, successNotification } = useNotificationsStore();
    try {
      await $axios.post(`/api/orders/cancel/${id}`);

      successNotification("order cancelled successfully");
    } catch (error) {
      errorNotification("failed to cancel order");
    }
  };

  confirmReceiving = async (id) => {
    const { errorNotification, successNotification } = useNotificationsStore();
    try {
      await $axios.post(`/api/orders/received/${id}`);

      successNotification("order confirmed successfully");
    } catch (error) {
      errorNotification("failed to confirm order");
    }
  };
}

export const useOrdersStore = defineStore("orders", () => new OrdersStore());
