import { defineStore } from 'pinia';
import { useNotificationsStore } from './notifications';
import axios from '~~/plugins/axios';
const $axios = axios().provide.axios;

class PaymentsStore {
	checkout = async (data) => {
		const { errorNotification } = useNotificationsStore();
		try {
			const response = await $axios.post('/api/checkout', data);
			return response.data;
		} catch (error) {
			errorNotification('checkout failed successfully');
		}
	};

	getInfo = async (data) => {
		const { errorNotification } = useNotificationsStore();
		try {
			const response = await $axios.post('/api/card/info', data);
			return response.data;
		} catch (error) {
			errorNotification(error.response.data?.error);
		}
	};
}

export const usePaymentsStore = defineStore('payments', () => new PaymentsStore());
