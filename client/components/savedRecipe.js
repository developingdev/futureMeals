import React, { Component } from 'react';
import axios from 'axios';

class SavedRecipe extends Component {

  render() {
    console.log('INGREDIENT LINES', this.props.recipeData.ingredientLines)
  const ingredients = this.props.recipeData.ingredientLines[0].split(/,|;/g).map((ingredient, index) => {
    console.log(ingredient)
      return <li>{ingredient}</li>
    })
    // console.log('INGREDIENTS ---->', Array.isArray(ingredients))

    return (
      <div>
        <a href={this.props.recipeData.url}><img src={this.props.recipeData.image}/></a>
        <h3>{this.props.recipeData.label}</h3>
        <ul>{ingredients}</ul>
        <p>Yield: {this.props.recipeData.yield}</p>
      </div>
    )
  }
}

module.exports = SavedRecipe;