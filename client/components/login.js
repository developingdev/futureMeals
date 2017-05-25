import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.props.handleLoginSubmit}>
          <div>
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={this.props.username}
              onChange={this.props.handleChange}
            />
          </div>
          <br/>
          <div>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={this.props.password}
              onChange={this.props.handleChange}
            />
            <br/>
            <br/>
            <button><Link id="loginLink" to="/search" onClick={this.props.handleLoginSubmit}>Login</Link></button>
          </div>
        </form>
        <br/>
        <Link to="/signup">Don't have an account?</Link>
      </div>
    );
  }
}

module.exports = Login;
