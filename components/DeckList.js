import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";
import AppButton from "./AppButton";
import { white, gray } from "../utils/colors";
import DeckListItem from "./DeckListItem";
import { getDecks } from "../actions";
import { loadDecks } from "../utils/api";
import { connect } from "react-redux";

const DeckList = props => {
	const decks = props.decks;
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		setLoading(true);
		loadDecks()
			.then(decks => props.getDecks(decks))
			.then(setLoading(false));
	});

	addNewDeckClick = () => {
		props.navigation.navigate("Add Deck");
	};

	if (loading) {
		return (
			<View style={styles.emptyScreen}>
				<Text style={styles.loading}>Loading...</Text>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			{Object.keys(decks).length > 0 && (
				<FlatList
					data={Object.values(decks)}
					keyExtractor={(item, index) => index}
					renderItem={({ item }) => (
						<DeckListItem
							deckId={item.title}
							navigation={props.navigation}
							deckTitle={item.title}
							numCards={item.questions && item.questions.length}
							deck={item}
						/>
					)}
				/>
			)}
			{Object.keys(decks).length === 0 && (
				<View style={styles.emptyScreen}>
					<Text style={styles.loading}>Please add a deck to get started.</Text>
					<AppButton onPress={addNewDeckClick}>Add Deck</AppButton>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		justifyContent: "flex-start",
		backgroundColor: white,
	},
	emptyScreen: {
		flex: 1,
		backgroundColor: white,
		justifyContent: "center",
		alignItems: "center",
	},
	loading: {
		fontSize: 15,
		textAlign: "center",
		color: gray,
		marginBottom: 20,
	},
});

const mapStateToProps = state => ({
	decks: state,
});

const mapDispatchToProps = dispatch => ({
	getDecks: decks => dispatch(getDecks(decks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
