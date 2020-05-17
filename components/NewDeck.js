import React, { useState } from "react";
import AppButton from "./AppButton";
import {
	KeyboardAvoidingView,
	Text,
	StyleSheet,
	TextInput,
} from "react-native";
import { white, beige } from "../utils/colors";
import { addDeck } from "../actions";
import { addNewDeck } from "../utils/api";
import { connect } from "react-redux";

const NewDeck = props => {
	const [deckTitle, setDeckTitle] = useState("");

	const onSubmitDeck = () => {
		if (deckTitle === "" || deckTitle.trim() === "") {
			alert("Please enter a valid deck title");
			return;
		}
		if (Object.keys(props.decks).includes(deckTitle.trim())) {
			alert("A deck with this title already exists!");
			setDeckTitle("");
			return;
		}
		const deck = {
			title: deckTitle.trim(),
			questions: [],
		};
		props.addDeck(deck);
		addNewDeck(deck);
		setDeckTitle("");
		props.navigation.navigate("Deck", { deckId: deck.title });
	};
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Text style={styles.label}>What is the title of your new deck?</Text>
			<TextInput
				style={styles.deckTitle}
				value={deckTitle}
				onChangeText={setDeckTitle}
				placeholder="Deck title"
			/>
			<AppButton onPress={onSubmitDeck}>Create Deck</AppButton>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: white,
	},
	label: {
		fontSize: 30,
		textAlign: "center",
	},
	deckTitle: {
		backgroundColor: white,
		width: 350,
		fontSize: 15,
		height: 40,
		padding: 5,
		borderWidth: 1,
		borderColor: beige,
		margin: 20,
		marginBottom: 200,
	},
});

const mapStateToProps = state => ({
	decks: state,
});

const mapDispatchToProps = dispatch => ({
	addDeck: deck => dispatch(addDeck(deck)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
