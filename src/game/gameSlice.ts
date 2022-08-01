import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isRejected, isPending, isFulfilled } from '@reduxjs/toolkit';
import { RootState } from "../app/store";
import { cardsMap } from "./cardsMap";

const rejectionReducer = (state: GameState) => {
  state.status = "failed";
};

const pendingReducer = (state: GameState) => {
  state.status = "loading";
};

const fulfilledReducer = (state: GameState, action: PayloadAction<any>) => {
  const { cards, deck_id, remaining } = action.payload;
  state.cards = [...cards];
  state.deckId = deck_id;
  state.remaining = remaining;
  state.status = "success";
  if (!shouldReshuffle(cards)) {
    state.playersPoints[findMaxIndex(cards)] += 1;
  } else {
    state.shouldReshuffle = true;
  }
};

const shouldReshuffle = (cards: apiCard[]) => {
  const cardsVal = cards.map((card) => card.value);
  let duplicates = cardsVal.filter((card, index) => cardsVal.indexOf(card) !== index);
  console.log(duplicates);
  return duplicates.length > 0
}

const findMaxIndex = (cards: apiCard[]) => {
  let handValues: number[] = [];
  cards.forEach((card, index) => {
    let cardVal: number = 0;
    if (cardsMap.hasOwnProperty(card.value)) {
      cardVal = cardsMap[card.value]
    } else {
      cardVal = parseInt(card.value);
    }
    handValues.push(cardVal);
  });
  return handValues.indexOf(Math.max(...handValues))
}

export interface GameState {
  status: 'success' | 'loading' | 'failed';
  cards:
  {
    image: string;
    value: string;
  }[];
  deckId: string;
  remaining: number;
  playersPoints: number[];
  reshuffle: number;
  shouldReshuffle: boolean;
}

export interface apiCard {
  code: string;
  image: string;
  images: { key: string };
  suit: string;
  value: string;
}

const initialState: GameState = {
  status: 'loading',
  cards: [
    {
      image: "",
      value: ""
    }
  ],
  deckId: "",
  remaining: 52,
  playersPoints: [],
  reshuffle: 0,
  shouldReshuffle: false
};

export const gameAsync = createAsyncThunk(
  'game/gameAsync',
  async (cards: number) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${cards}`)
    return await response.json()
  }
);

export const drawCard = createAsyncThunk(
  'game/drawCard',
  async (players: number, { getState }) => {
    const state = getState() as RootState;
    let deckID = state.game.deckId;
    console.log(state);
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${players}`)
    return await response.json()
  }
);

export const reshuffle = createAsyncThunk(
  'game/reshuffle',
  async (_, { getState }) => {
    const state = getState() as RootState;
    let deckID = state.game.deckId;
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/?remaining=true`)
    return await response.json()
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initScore: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.playersPoints = [...Array(action.payload).fill(0)];
    }
  },
  extraReducers: (builder) => {

    builder
      .addCase(reshuffle.fulfilled, (state, action: PayloadAction<any>) => {
        state.reshuffle += 1;
        state.shouldReshuffle = false;
      });

    builder.addMatcher(
      isRejected(drawCard, gameAsync, reshuffle),
      rejectionReducer
    );

    builder.addMatcher(
      isPending(drawCard, gameAsync, reshuffle),
      pendingReducer
    );

    builder.addMatcher(
      isFulfilled(drawCard, gameAsync),
      fulfilledReducer
    );
  },
});



// export const suffleAndDrawCards =
//   (amount: number): AppThunk =>
//     (dispatch, getState) => {
//       suffleAndDrawCardsReq(amount).then(resp => dispatch(requestDone(resp)));

//     };

// export const gameAsyncAction = createAction<number>('game/suffleAndDrawCards')

export const { initScore } = gameSlice.actions;

export default gameSlice.reducer;
