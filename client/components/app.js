import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './login';
import Signup from './signup';
import Profile from './profile';
import Nav from './nav';
import RecipeDisplay from './recipeDisplay';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: '',
      isAuthenticated: false,
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignUpSubmit() {
    axios.post('/signup', { username: this.state.username, password: this.state.password })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false });
        }
      });
  }

  handleLoginSubmit() {
    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
        <Router>
          <div>
            <Route
              exact
              path="/"
              render={() => (
                (<div>
                  <Nav />
                  <Login
                    handleSignUpClick={this.handleSignUpClick}
                    handleChange={this.handleChange}
                    handleLoginSubmit={this.handleLoginSubmit}
                  />
                </div>)
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                (<div>
                  <Nav />
                  <Signup
                    handleChange={this.handleChange}
                    handleSignUpSubmit={this.handleSignUpSubmit}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                </div>)
              )}
            />
            <Route
              path="/search"
              render={({ match }) => (
                this.state.isAuthenticated ?
                (<div>
                  <Nav />
                  <RecipeDisplay
                    username={this.state.username}
                    handleProfileClick={this.handleProfileClick}
                    isAuthenticated={this.state.isAuthenticated}
                    match={match}
                  />
                </div>) :
                  <h1>NOT AUTHORIZED</h1>
              )}
            />
            <Route
              exact
              path="/profile"
              render={() => (
                this.state.isAuthenticated ?
                  (<div>
                    <Nav />
                    <Profile
                      username={this.state.username}
                      isAuthenticated={this.state.isAuthenticated}
                    />
                  </div>) :
                  <h1>NOT AUTHORIZED</h1>
              )}
            />
          </div>
        </Router>
    );
  }
}

module.exports = App;
