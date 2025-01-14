import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/Home.css";

const Home = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [cuisine, setCuisine] = useState("");

  const handleFilter = (e) => {
    setCuisine(e.target.value);
    fetchRecipes(searchQuery, e.target.value); // Use searchQuery from props
  };

  const fetchRecipes = async (query = "", cuisine = "") => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            apiKey: "28eb062216964cb0a35395b51bd9999d",
            query,
            cuisine,
            number: 10,
          },
        }
      );
      setRecipes(response.data.results);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRecipes(searchQuery);
  }, [searchQuery]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipes.length && !error) {
    return <p>Loading recipes...</p>;
  }

  return (
    <div className="home-container">
      <div className="content-container">
        {/* Categories */}
        <div className="categories">
          <h3>Categories</h3>
          <select onChange={handleFilter} value={cuisine} className="category-select">
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>

        {/* Recipe Grid */}
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <h4 className="recipe-title">{recipe.title}</h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
