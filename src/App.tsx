import React from 'react';
import Game from './game/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <Game numberOfPlayers={2} />
    </div>
  );
}

export default App;
