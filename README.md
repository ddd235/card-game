# Card Game React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

It uses the free Deck of Cards API as a backend.
API documentation is here https://deckofcardsapi.com/


## Available Scripts

In the project directory, you can run:
## `npm install`

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to play
THE PACK
Players use one standard deck of 52 cards.

OBJECT OF THE GAME
Be the first player to to accumulate the most points.

CARD VALUES/SCORING
After comparison of the values, the point is going to the player that has the higher card(10 is higher than 8, King is higher than 10, Ace wins over all).

THE DEAL
Each player is dealt 1 card.
When both cards have the same value (ex. two aces) they should go back to deck and deck will be reshuffled.

THE PLAY
Open the app and the game starts with a shuffled deck and 2 cards drawn, one for each player.
To draw cards press on the card faced back, that represents the deck.
When there are no more cards to play, a message will be shown announcing the winner.

Limitations
 - Game is designed to work with more than 2 players, should have an input to type the players number
 - Winner decision must be improved in case 2 players have same number of points, for now only the first found gets to win.  


