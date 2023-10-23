import { defineStore } from "pinia";
import { useNotificationsStore } from "./notifications";
import axios from "~~/plugins/axios";
const $axios = axios().provide.axios;

class SpacesStore {
  spaces = ref([]);

  store = async (space) => {
    const { successNotification, errorNotification } = useNotificationsStore();
    try {
      await $axios.post("/api/spaces", space);
      successNotification(`${space.name} space created successfully`);
    } catch (error) {
      errorNotification("failed to create space");
    }
  };

  fetchAll = async () => {
    const response = await $axios("/api/spaces");
    this.spaces.value = response.data.data;
  };

  fetchRequests = async () => {};

  attachUser = async (spaceId, userName) => {
    const { errorNotification, successNotification } = useNotificationsStore();

    try {
      await $axios.post(`/api/spaces/attach/${spaceId}/${userName}`);
      successNotification(`user added successfully`);
    } catch (error) {
      errorNotification("failed to add user");
    }
  };

  detachUser = async (spaceId, userName) => {
    const { errorNotification, successNotification } = useNotificationsStore();

    try {
      await $axios.post(`/api/spaces/detach/${spaceId}/${userName}`);
      successNotification(`user deleted successfullsy`);
    } catch (error) {
      errorNotification("failed to delete user");
    }
  };

  update = async (space) => {
    const { errorNotification, successNotification } = useNotificationsStore();
    try {
      await $axios.put(`/api/spaces/${space.id}`, space);
      successNotification(`space updated successfully`);
    } catch (error) {
      errorNotification("failed to update space");
    }
  };

  destroy = async (id) => {
    const { errorNotification, successNotification } = useNotificationsStore();
    try {
      await $axios.delete(`/api/spaces/${id}`);
      successNotification(`space deleted successfully`);
    } catch (error) {
      errorNotification("failed to delete space");
    }
  };
}

export const useSpacesStore = defineStore("spaces", () => new SpacesStore());
