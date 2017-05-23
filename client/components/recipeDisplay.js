import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Recipe from './recipe';

class RecipeDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleRecipeChange = this.handleRecipeChange.bind(this);
    this.state = {
      q: '',
      healthlabel: '',
      recipes: [],
    };
  }

  componentDidMount() {
    console.log('recipeDisplay mounted!');
  }

  handleRecipeChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    console.log('search!');
    // const base = 'https://api.edamam.com/search?';
    // const q = `q=${this.state.q}`;
    // const idAndKey = '&app_id=9c91d5f4&app_key=6f47ee6858565edebe96788f8743461a';
    // const range = '&from=0&to=5';
    // const url = base + q + idAndKey + range;
    axios.get(`/search?query=${this.state.q}`)
      .then((response) => {
        this.setState({ recipes: response.data.hits });
      });
  }

  render() {
    const recipes = this.state.recipes.map((curr, i) => (
      <Recipe recipedata={curr} username={this.props.username} key={i} />
    ));

    return (
      <div>
        <h1>Search for a Recipe</h1>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            placeholder="Search"
            type="text"
            name="q"
            value={this.state.q}
            onChange={this.handleRecipeChange}
          />
          <Link to="/search" onClick={this.handleSearchSubmit}>Submit</Link>
        </form>
        <Link to="/profile" onClick={this.props.handleProfileClick}>Profile</Link>
        {recipes}
      </div>
    );
  }
}

module.exports = RecipeDisplay;
