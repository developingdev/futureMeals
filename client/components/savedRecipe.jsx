import React, { Component } from 'react';
import axios from 'axios';

class SavedRecipe extends Component {
  render() {


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
    );
  }
}

module.exports = SavedRecipe;
