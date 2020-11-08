import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import { Home } from './pages/Home.js';
import { Game } from './features/game/Game.js';

function App() {
  return (
    <Router>
      <div>
        <ul id="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
        </ul>

        <div className="router-body">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/game">
                <Game />
              </Route>
            </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
