import { defineStore } from "pinia";
import { useNotificationsStore } from "./notifications";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

class ProfileStore {
  user = ref({});

  fetchProfile = async (name) => {
    try {
      const res = await $axios.get(`/api/users/${name}`);
      this.user.value = res.data;
    } catch (error) {
      this.user.value.id = false;
    }
  };

  storeContactSaver = async (name, email, phone) => {
    const { successNotification, errorNotification } = useNotificationsStore();
    try {
      await $axios.post("/api/contact-saver", {
        name,
        email,
        phone,
        user_id: this.user.value.id,
      });

      successNotification("form submitted successfully");
    } catch (error) {
      errorNotification("failed to submit form");
    }
  };

  storeVisitor = async () => {
    try {
      await $axios.post(`/api/visitor/${this.user.value.id}`, {
        device: getUserDevice(),
      });
    } catch (error) {}
  };
}

export const useProfileStore = defineStore("profile", () => new ProfileStore());

function getUserDevice() {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("android") > -1) {
    return "android";
  } else if (
    userAgent.indexOf("iphone") > -1 ||
    userAgent.indexOf("ipad") > -1
  ) {
    return "iphone";
  } else if (
    userAgent.indexOf("windows") > -1 ||
    userAgent.indexOf("linux") > -1 ||
    userAgent.indexOf("mac") > -1
  ) {
    return "laptop";
  } else {
    return "unknown";
  }
}
