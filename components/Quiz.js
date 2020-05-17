import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { white, red, gray, green, beige } from "../utils/colors";
import AppButton from "./AppButton";
import QuizResult from "./QuizResult";
import { connect } from "react-redux";
import { clearNotification, setNotification } from "../utils/notification";

const Quiz = props => {
	const deck = props.deck;
	const numQuestions = deck.questions.length;
	const [currQuestion, setCurrQuestion] = useState(1);
	const [numCorrect, setNumCorrect] = useState(0);
	const card = deck.questions[currQuestion - 1];
	const [answer, setShowAnswer] = useState(false);
	const [quizComplete, setQuizComplete] = useState(false);

	const questionComplete = correct => {
		if (correct) {
			setNumCorrect(numCorrect + 1);
		}
		if (currQuestion === numQuestions) {
			setQuizComplete(true);
			clearNotification();
			setNotification();
		} else {
			setCurrQuestion(currQuestion + 1);
			setShowAnswer(false);
		}
	};

	const restartQuiz = () => {
		setQuizComplete(false);
		setNumCorrect(0);
		setCurrQuestion(1);
		setShowAnswer(false);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.progress}>{currQuestion} / {numQuestions}</Text>
			{quizComplete ? (
				<QuizResult
					corr={numCorrect}
					total={numQuestions}
					navigation={props.navigation}
					restartQuiz={restartQuiz}
				/>
			) : (
				<View style={styles.quiz}>
					<ScrollView style={styles.question}>
						{answer ? (
							<Text style={styles.text}>{card.answer}</Text>
						) : (
							<Text style={styles.text}>{card.question}</Text>
						)}
					</ScrollView>
					<View style={{ marginTop: 15 }}>
						<TouchableOpacity onPress={() => setShowAnswer(!answer)}>
							<Text style={styles.toggleQuestion}>
								{answer ? "Go to question" : "Show answer"}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttons}>
						<AppButton
							style={{ backgroundColor: green }}
							onPress={() => questionComplete(true)}
						>
							Correct
						</AppButton>
						<AppButton
							style={{ backgroundColor: red }}
							onPress={() => questionComplete(false)}
						>
							Incorrect
						</AppButton>
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		alignItems: "center",
	},
	progress: {
		fontSize: 15,
		color: gray,
		textAlign: "center",
		marginTop: 10,
	},
	quiz: {
		justifyContent: "center",
		alignItems: "center",
	},
	question: {
		marginTop: 30,
		marginBottom: 5,
		borderColor: beige,
		borderWidth: 2,
		padding: 10,
		width: 350,
		maxHeight: 200,
	},
	text: {
		fontSize: 25,
		textAlign: "center",
	},
	toggleQuestion: {
		fontSize: 15,
		color: gray,
		textDecorationLine: "underline",
	},
	buttons: {
		marginTop: 70,
	},
});

const mapStateToProps = (state, ownProps) => ({
	deck: state[ownProps.route.params.deckId],
});

export default connect(mapStateToProps)(Quiz);
