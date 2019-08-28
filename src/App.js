import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './View/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props)=>{
          return  <Redirect {...props} to="/app"></Redirect>
        }}></Route>
        <Route path="/login"></Route>
        <Route path="/app" render={(props) => {
          return (
            <Home></Home>
          );
        }}></Route>
        <Route component="Empty"></Route>
      </Switch>
    </Router>
  );
}

export default App;
