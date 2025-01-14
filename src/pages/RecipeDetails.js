import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: process.env.REACT_APP_API_KEY,
            },
          }
        );
        setRecipe(response.data);
      } catch (err) {
        setError("Failed to fetch recipe details. Please try again later.");
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} width="300" />
      
      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      
      <h3>Instructions:</h3>
      <div
        className="instructions"
        dangerouslySetInnerHTML={{ __html: recipe.instructions }}
      />
    </div>
  );
};

export default RecipeDetails;
