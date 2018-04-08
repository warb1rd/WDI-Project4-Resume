import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import NavigationBar from './views/SemanticNavBar.js';
import SignUp from './views/SignUp';
import ModalSignUp from './views/ModalSignUp';
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import Home from './views/Home';
import httpClient from './httpClient';


class App extends Component {
  state = { 
    currentUser: httpClient.getCurrentUser() 
  }

	onLoginSuccess(user) {
		this.setState({ 
      currentUser: httpClient.getCurrentUser() 
    })
	}

	logOut() {
		httpClient.logOut()
		this.setState({ 
      currentUser: null 
    })
  }
  
  render() {
    const {currentUser} = this.state

    return (
      <div className="App">
      <NavigationBar currentUser={currentUser}/>
        <Switch>
            <Route path="/login" render={(props) => {
              return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
            }} />
            
            <Route path="/logout" render={(props) => {
              return <LogOut onLogOut={this.logOut.bind(this)} />
            }} />
            
            <Route path="/signup" render={(props) => {
              return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
            }} />

            <Route path="/" component={Home} />

        </Switch>

      </div>
    );
  }
}

export default App;
