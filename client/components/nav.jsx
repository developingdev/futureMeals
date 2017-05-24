import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './recipe';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';



class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="navBarDiv">
        <Link className="navBarLinks" to="/">Login</Link>
        <Link className="navBarLinks" to="/signup">Register</Link>
        <Link className="navBarLinks" to="/profile">Profile</Link>
        <Link className="navBarLinks" to="/search">Search Recipes</Link>
      </div>
    )
  }
}

module.exports = Nav;