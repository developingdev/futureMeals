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
      page: 1
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
    axios.get(`/search?query=${this.state.q}&page=${this.state.page}`)
      .then((response) => {
        this.setState({ recipes: response.data.hits });
      });
  }

  render() {
    const randomIndex = {};
    let count = this.state.recipes.length;
    if (count < 5){
      count = 5;
    }
    while (Object.keys(randomIndex).length < 5){
      const index = Math.round(Math.random()*count);
      randomIndex[index] = index;
    }
    
    const recipes = this.state.recipes.map((curr, i) => {
      if (randomIndex[i]) {
        return (<Recipe recipedata={curr} username={this.props.username} key={i} />)
      }
    });

    return (
      <div>
        <h1>Search for a Recipe</h1>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            placeholder="I want some..."
            type="text"
            name="q"
            value={this.state.q}
            onChange={this.handleRecipeChange}
          />
          <br/>
          <br/>
          <button><Link id="searchSubmit" to="/search" onClick={this.handleSearchSubmit}>Submit</Link></button>
        </form>
      <br/>
        {recipes}
      </div>
    );
  }
}

module.exports = RecipeDisplay;
