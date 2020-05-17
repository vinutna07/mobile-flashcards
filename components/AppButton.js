import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { beige, gray } from "../utils/colors";

const AppButton = ({ children, onPress, style = {}, disabled = false }) => {
	return (
		<TouchableOpacity
			style={[styles.button, style]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={[styles.reset, style]}>{children}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		margin: 10,
		padding: 15,
		width: 250,
		height: 75,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: beige,
	},
	reset: {
		textAlign: "center",
		fontSize: 15,
		color: gray,
	},
});

export default AppButton;
