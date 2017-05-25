import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Signup extends Component {

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.props.handleSignUpSubmit} method="POST">
          <div>
            <input placeholder="Create Username" type="text" name="username" value={this.props.username} onChange={this.props.handleChange} />
          </div>
          <br/>
          <div>
            <input placeholder="Create Password" type="password" name="password" value={this.props.password} onChange={this.props.handleChange} />
            <br/>
            <br/>
            <button><Link id="signupLink" to="/search" onClick={this.props.handleSignUpSubmit}>Signup</Link></button>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = Signup;
