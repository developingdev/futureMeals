import React, { Component } from 'react';
import axios from 'axios';

class SavedRecipe extends Component {

  render() {
    console.log('INGREDIENTS: ', this.props.recipeData.ingredientLines)
    // const ingredients = this.props.recipeData.ingredientLines[0].split(/,|;/g).map((ingredient, index) => {
    //   console.log(ingredient)
    //   return <li>{ingredient}</li>
    // })
    const ingredients = this.props.recipeData.ingredientLines.map(ing => {
      return <li>{ing}</li>;
    })
    // console.log('INGREDIENTS ---->', Array.isArray(ingredients))

    return (
      <div>
        <a href={this.props.recipeData.url}><img src={this.props.recipeData.image} /></a>
        <h3>{this.props.recipeData.label}</h3>
        <ul>{ingredients}</ul>
        <p>Yield: {this.props.recipeData.yield}</p>
      </div>
    )
  }
}

module.exports = SavedRecipe;