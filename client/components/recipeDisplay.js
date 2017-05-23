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

    axios.get(`/search?query=${this.state.q}`)
      .then((response) => {
        this.setState({ recipes: response.data.hits });
      });
  }

  render() {
<<<<<<< HEAD
    const recipes = this.state.recipes.map((curr, i) => (
      <Recipe recipedata={curr} username={this.props.username} key={i} />
    ));
=======
    let recipes = this.state.recipes.map((curr, i) => {
      return <Recipe recipedata={curr} username={this.props.username} key={i} />
    })

    console.log('in recipe display')
    // const ingredients = this.props.recipeData.ingredientLines[0].split(/,|;/g).map((ingredient, index) => {
    //   console.log(ingredient)
    //   return <li>{ingredient}</li>
    // })
>>>>>>> da4fc19cc48e8db1c50aa329fd93fcc8d7c5048f

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
