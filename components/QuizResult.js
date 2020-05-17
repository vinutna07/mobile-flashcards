import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { gray } from "../utils/colors";
import AppButton from "./AppButton";

const QuizResult = props => {
	const percentScore = ((props.corr / props.total) * 100).toFixed(2);
	return (
		<View style={styles.container}>
			<View style={{ marginTop: 100 }}>
				<Text
					style={styles.score}
				>{`Your score : ${props.corr}/${props.total}`}</Text>
				<Text
					style={styles.percent}
				>{`percentage correct : ${percentScore}%`}</Text>
			</View>
			<View style={styles.buttons}>
				<AppButton
					onPress={() => {
						props.restartQuiz();
					}}
				>
					Restart Quiz
				</AppButton>
				<AppButton
					onPress={() => {
						props.navigation.goBack();
					}}
				>
					Back to Deck
				</AppButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	score: {
		fontSize: 30,
		textAlign: "center",
		padding: 10,
		marginBottom: 5,
	},
	percent: {
		fontSize: 15,
		color: gray,
		textAlign: "center",
		marginBottom: 5,
	},
	buttons: {
		marginTop: 150,
	},
});

export default QuizResult;
