import { AsyncStorage } from "react-native";

const DECK_STORAGE_KEY = "MobileFlashcards:decks";

const initialData = {
	React: {
		title: "React",
		questions: [
			{
				question: "What is React?",
				answer: "A library for managing user interfaces",
			},
			{
				question: "Where do you make Ajax requests in React?",
				answer: "The componentDidMount lifecycle event",
			},
		],
	},
	JavaScript: {
		title: "JavaScript",
		questions: [
			{
				question: "What is a closure?",
				answer:
					"The combination of a function and the lexical environment within which that function was declared.",
			},
		],
	},
};

const loadDecks = () => {
	return AsyncStorage.getItem(DECK_STORAGE_KEY).then(result => {
		if (result) {
			return JSON.parse(result);
		}
	});
};

const addNewDeck = deck => {
	return AsyncStorage.mergeItem(
		DECK_STORAGE_KEY,
		JSON.stringify({
			[deck.title]: deck,
		}),
	);
};

const addNewCard = (deckTitle, card) => {
	AsyncStorage.getItem(DECK_STORAGE_KEY).then(result => {
		let decks = JSON.parse(result);
		decks[deckTitle].questions.push({
			question: card.question,
			answer: card.answer,
		});
		AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks));
	});
};

const clearAsyncStorage = async () => {
	AsyncStorage.clear();
};

export { loadDecks, addNewDeck, addNewCard, clearAsyncStorage };
