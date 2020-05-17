import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { white, gray, beige } from "../utils/colors";

const DeckListItem = props => {
	const count = props.numCards;
	const cardsText = count === 1 ? "card" : "cards";
	return (
		<TouchableOpacity
			style={styles.deck}
			onPress={() => {
				props.navigation.navigate("Deck", { deckId: props.deckId });
			}}
		>
			<Text style={styles.title}>{props.deckTitle}</Text>
			<Text style={styles.count}>
				{count} {cardsText}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		textAlign: "center",
		marginBottom: 5,
	},
	deck: {
		flex: 1,
		backgroundColor: white,
		justifyContent: "center",
		margin: 5,
		padding: 25,
    height: 120,
    borderWidth: 1,
    borderColor: beige,
	},
	count: {
		fontSize: 15,
		textAlign: "center",
		color: gray,
	},
});

export default DeckListItem;
