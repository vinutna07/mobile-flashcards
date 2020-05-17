import React, { useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { gray, disabledGray } from "./utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import Constants from "expo-constants";
import NewCard from "./components/NewCard";
import DeckList from "./components/DeckList";
import DeckView from "./components/DeckView";
import NewDeck from "./components/NewDeck";
import Quiz from "./components/Quiz";
import reducer from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { setNotification } from "./utils/notification";

const FlashcardsStatusBar = ({ backgroundColor, ...props }) => {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
};

const Tab = createBottomTabNavigator();

const Tabs = () => (
	<Tab.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;
				if (route.name === "Decks") {
					iconName = focused ? "cards" : "cards-outline";
				} else if (route.name === "Add Deck") {
					iconName = focused ? "plus-box" : "plus-box-outline";
				}
				return (
					<MaterialCommunityIcons name={iconName} size={size} color={color} />
				);
			},
		})}
		tabBarOptions={{
			activeTintColor: gray,
			inactiveTintColor: disabledGray,
		}}
	>
		<Tab.Screen name="Decks" component={DeckList} />
		<Tab.Screen name="Add Deck" component={NewDeck} />
	</Tab.Navigator>
);

const Stack = createStackNavigator();

const MainNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen
				name="Flashcards"
				component={Tabs}
				options={{ title: "" }}
			/>
			<Stack.Screen name="Add Deck" component={NewDeck} />
			<Stack.Screen
				name="Deck"
				component={DeckView}
				options={{
					title: "",
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name="Add Card"
				component={NewCard}
				options={{
					title: "",
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name="Quiz"
				component={Quiz}
				options={{
					title: "",
					headerBackTitleVisible: false,
				}}
			/>
		</Stack.Navigator>
	</NavigationContainer>
);

const App = () => {
	useEffect(() => {
		setNotification();
	});

	return (
		<Provider store={createStore(reducer)}>
			<View style={styles.container}>
				<FlashcardsStatusBar />
				<MainNavigator />
			</View>
		</Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
