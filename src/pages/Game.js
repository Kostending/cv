import { StartGame } from '../features/game/Game.js';
export const Game = function() {
	StartGame();

  return (
    <div id="game-container" className="container">
      <div className="item" id="gamestat-container">
      </div>
      <div className="item">
      </div>
    </div>
  );
}

