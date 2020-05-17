import { ADD_CARD, ADD_DECK, GET_DECKS } from "../actions";

const decks = (state = {}, action) => {
	switch (action.type) {
		case ADD_DECK:
			return {
				...state,
				[action.deck.title]: action.deck,
			};
		case GET_DECKS:
			return {
				...state,
				...action.decks,
			};
		case ADD_CARD:
			return {
				...state,
				[action.deckTitle]: {
					...state[action.deckTitle],
					questions: {
						...state[action.deckTitle].questions,
						...action.card,
					},
				},
			};
		default:
			return state;
	}
};

export default decks;
