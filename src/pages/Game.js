import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StartGame } from '../features/game/Game.js';

import {
  selectName
} from '../features/game/gameSlice';

export const Game = function() {
	// Start game seems to be called multiple times
	StartGame();
	const playerName = useSelector(selectName);


  return (
    <div id="game-container" className="container">
      <div className="item" id="gamestat-container">
      	<h1>{playerName}</h1>
      </div>
      <div className="item">
      </div>
    </div>
  );
}

