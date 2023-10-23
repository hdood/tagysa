import useNotificationsStore from "@/stores/notifcations";

export const useMakeNotification =
	() =>
	(
		title = "",
		content = "",
		type = "success",
		icon = "Checkmark",
		duration = 2500
	) => {
		const { notification } = useNotificationsStore();
		notification({ title, content, type, icon }, duration);
	};
