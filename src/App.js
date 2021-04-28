
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import History from './components/History'
import Game from './components/Game'

function App() {
  
  return (
    <>
      <div>
        <Router>
          <div>
            <div className="menu">
              <ul className="nav nav-pills">
                <li className="nav-item p-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-item p-2">
                  <Link to="/history">History</Link>
                </li>
              </ul>
            </div>
            <Switch>
              <Route path="/history">
                <History />
              </Route>
              <Route path="/">
                <Game />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </>
    
  );
}

export default App;
