import React, { useState } from "react";
import {
	TextInput,
	StyleSheet,
	Text,
	KeyboardAvoidingView,
} from "react-native";
import AppButton from "./AppButton";
import { white, beige } from "../utils/colors";
import { addCard } from "../actions";
import { addNewCard } from "../utils/api";
import { connect } from "react-redux";

const NewCard = props => {
	const deckId = props.route.params.deckId;
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	const onSubmitCard = () => {
		if (question === "" || question.trim() === "") {
			alert("Please enter a question");
			return;
		}
		if (answer === "" || answer.trim() === "") {
			alert("Please enter an answer");
			return;
		}
		const card = {
			question,
			answer,
		};
		props.addCard(deckId, card);
		addNewCard(deckId, card);
		props.navigation.navigate("Deck", { deckId });
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Text style={styles.label}>{`Add a card to ${deckId} deck`}</Text>
			<KeyboardAvoidingView style={styles.textFields}>
				<TextInput
					style={styles.inputText}
					value={question}
					onChangeText={setQuestion}
					placeholder="Question"
				/>
				<TextInput
					style={styles.inputText}
					value={answer}
					onChangeText={setAnswer}
					placeholder="Answer"
				/>
			</KeyboardAvoidingView>
			<AppButton onPress={onSubmitCard}>Submit</AppButton>
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
		marginBottom: 20
	},
	inputText: {
		backgroundColor: white,
		width: 350,
		fontSize: 15,
		height: 40,
		padding: 5,
		borderWidth: 1,
		borderColor: beige,
		marginTop: 20,
		margin: 10,
	},
	textFields: {
		marginBottom: 150,
	},
});

const mapStateToProps = state => ({
	decks: state,
});

const mapDispatchToProps = dispatch => ({
	addCard: (deckId, card) => dispatch(addCard(deckId, card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);
