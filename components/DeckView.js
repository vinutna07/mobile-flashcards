import React from "react";
import { Text, StyleSheet, View } from "react-native";
import AppButton from "./AppButton";
import { white, gray, disabledGray, beige } from "../utils/colors";
import { connect } from "react-redux";

const DeckView = props => {
	const deckId = props.route.params.deckId;
	const deck = props.decks[deckId];
	const count = deck.questions.length;
	const cardsText = count === 1 ? "card" : "cards";
	return (
		<View style={styles.container}>
			<View style={styles.deckInfo}>
				<Text style={styles.title}>{deck.title}</Text>
				<Text style={styles.count}>
					{count} {cardsText}
				</Text>
				{count === 0 && (
					<Text style={styles.noCards}>
						This deck has no cards yet. Add card to take quiz.
					</Text>
				)}
			</View>
			<AppButton
				style={{
					backgroundColor: deck.questions.length === 0 ? disabledGray : beige,
				}}
				disabled={deck.questions.length === 0}
				onPress={() => {
					props.navigation.navigate("Quiz", { deckId: deckId });
				}}
			>
				Start Quiz
			</AppButton>
			<AppButton
				onPress={() => {
					props.navigation.navigate("Add Card", { deckId: deckId });
				}}
			>
				Add Card
			</AppButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: white,
	},
	deckInfo: {
		marginBottom: 150,
	},
	title: {
		fontSize: 50,
		textAlign: "center",
	},
	count: {
		fontSize: 15,
		color: gray,
		textAlign: "center",
		marginTop: 10,
	},
	noCards: {
		fontSize: 10,
		color: gray,
		textAlign: "center",
		marginTop: 15,
	},
});

const mapStateToProps = state => ({
	decks: state,
});

export default connect(mapStateToProps, null)(DeckView);
