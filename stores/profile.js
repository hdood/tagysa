import { defineStore } from "pinia";
import { useNotificationsStore } from "./notifications";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

class ProfileStore {
  user = ref({});

  activeProfile = ref({})

  fetchProfile = async (profileId) => {
    try {
      const response = await $axios(`/api/${profileId}`)
      this.activeProfile.value = response.data.data
  } catch (error) {
      this.user.value.id = false;
      this.activeProfile.value.id = false;
    }
  };

  updateProfileImage = async (data, profileId) => {
		return await $axios.post("/api/profile-picture/" + profileId, data);
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

  storeVisitor = async (profileId) => {
    try {
      await $axios.post(`/api/visitor/${profileId}`, {
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
