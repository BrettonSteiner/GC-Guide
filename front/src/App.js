import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} /> 
        </Switch>
     </Router>
    </div>
  );
}

export default App;
