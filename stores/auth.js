import axios from "~~/plugins/axios";
import { defineStore, storeToRefs } from "pinia";
import { useNotificationsStore } from "./notifications";
import { useUserStore } from "./user";
const app = useNuxtApp();
const $axios = axios(app).provide.axios;

class AuthStore {
  register = async (name, email, password, confirmPassword) => {
    await $axios.post("/register", {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    });
  };

  login = async (email, password) => {
    await $axios.post("/login", {
      email: email,
      password: password,
    });
  };

  logout = async () => {
    await $axios.post("/logout");
    useUserStore().user.value = {};
  };

  sendVerificationLink = async () => {
    try {
      const response = await $axios.post("/email/verification-notification");
      return response.data;
    } catch (error) {
      return false;
    }
  };

  verifyEmail = async (id, hash) => {
    const { successNotification, errorNotification } = useNotificationsStore();

    try {
      await $axios(`/verify-email/${id}/${hash}`);

      successNotification("email verified successfully");

      return true;
      
    } catch (error) {

      errorNotification("failed to verify email");

      return false;

    }
  };

  changePassword = async (currentPassword, newPassword, cPassword) => {
    const { successNotification, errorNotification } = useNotificationsStore();
    try {
      await $axios.post("/api/change-password", {
        old_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: cPassword,
      });
      successNotification("password updated successfully");

      return true;
    } catch (error) {
      if (error.response.data.error == "wrong password") {
        errorNotification("wrong password");
        return;
      }
      errorNotification("password confirmation does not match password");
      return false;
    }
  };

  deleteAccount = async (password) => {
    const { successNotification, errorNotification } = useNotificationsStore();
    const { user } = storeToRefs(useUserStore());
    try {
      await $axios.post("/api/account", {
        password,
      });
      successNotification("account deleted successfully");
      user.value = {};
      return true;
    } catch (error) {
      errorNotification("wrong password");
      return false;
    }
  };
}

export const useAuthStore = defineStore("auth", () => new AuthStore());
