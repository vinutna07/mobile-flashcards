import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "MobileFlashcards:notifications";

const createNotification = () => ({
	title: "Time to study!",
	body: "Don't forget to practice your quizzes today.",
	ios: {
		sound: true,
	},
	android: {
		sound: true,
		priority: "high",
		sticky: false,
		vibrate: false,
	},
});

const clearNotification = () => {
	AsyncStorage.removeItem(NOTIFICATION_KEY).then(
		Notifications.cancelAllScheduledNotificationsAsync(),
	);
};

const setNotification = () => {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if (!data) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === "granted") {
						Notifications.cancelAllScheduledNotificationsAsync();
						let tomorrow = new Date();
						tomorrow.setDate(tomorrow.getDate() + 1);
						tomorrow.setHours(17);
						tomorrow.setMinutes(0);

						Notifications.scheduleLocalNotificationAsync(createNotification(), {
							time: tomorrow,
							repeat: "day",
						});

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
					}
				});
			}
		});
};

export { createNotification, clearNotification, setNotification };
