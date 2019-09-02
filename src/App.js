import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Empty from './View/Empty';
import Home from './View/Home';
import Login from './View/Login';
import './App.scss';

function App() {
  return (
   <Router>
     <Switch>
      <Route path="/" exact render={(props) => {
        return <Redirect to="/home"></Redirect>
      }}></Route>
      <Route path="/home" render={(props) => {
        return <Home {...props}></Home>
      }} ></Route>
      <Route path="/login" component={Login}></Route>
      <Route component={Empty}></Route>
     </Switch>
   </Router>
  );
}

export default App;
