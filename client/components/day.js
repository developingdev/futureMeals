import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './recipe.js';
import SavedRecipe from './savedRecipe.js'
import { Link } from 'react-router-dom';
//whatever child components we need

class Day extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.state = {
      username: this.props.username,
      day: this.props.day,
      savedRecipes: []
      // label: '',
      // image: '',
      // url: '',
      // yield: 0,
      // healthLabels: [],
      // ingredientLines: []
    }
  }

  componentDidMount() {
    console.log('in component did mount')
    axios.get(`day/${this.state.day}/${this.state.username}`)
      .then((response) => {
        this.setState({ savedRecipes: response.data });
      });
  }

  handleDeleteSubmit() {
    console.log("IN DELETE RECIPE")
    axios.post('/delete', { username: this.state.username, day: this.state.day })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isAuthenticated: true });
          console.log("SETTING STATE")
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    const recipes = this.state.savedRecipes.map((curr, index) => {
      return (
        <span>
          <SavedRecipe recipeData={curr} key={index} />
          <Link to="/profile" onClick={this.handleDeleteSubmit}> DELETE </Link>
        </span>)
    });

    return (
      <div>
        <h4>{this.props.day}</h4>
        {recipes}
      </div>
    )
  }
}

module.exports = Day;