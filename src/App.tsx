import React from 'react';
import Game from './game/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <Game numberOfPlayers={4} />
    </div>
  );
}

export default App;
