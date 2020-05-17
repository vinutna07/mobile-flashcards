export const ADD_CARD = "ADD_CARD";
export const ADD_DECK = "ADD_DECK";
export const GET_DECKS = "GET_DECKS";

export const getDecks = decks => {
	return {
		type: GET_DECKS,
		decks,
	};
};

export const addDeck = deck => {
	return {
		type: ADD_DECK,
		deck,
	};
};

export const addCard = (deckTitle, card) => {
	return {
		type: ADD_CARD,
		deckTitle,
		card,
	};
};
