import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';


import User from './components/usertest';
import Signup from './components/signup';
import Login from './components/login';
import Dashboard from './components/dashboard';
import NewChat from './components/newchat';
import Chatpage from './components/chatpage';

function App() {
  return (
    <div >
     
     <Router>
     <Switch>
     <Route path = "/" exact component={Login}/>
     <Route path = "/signup" component={Signup}/>


     </Switch>
     

       </Router>
    </div>
  );
}

export default App;
