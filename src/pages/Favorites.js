// src/components/Favorites.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Favorites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "favorites"));
          const favoriteRecipes = [];
          querySnapshot.forEach((doc) => {
            favoriteRecipes.push(doc.data());
          });
          setFavorites(favoriteRecipes);
        } catch (err) {
          setError("Failed to fetch favorites");
        }
      };
      fetchFavorites();
    }
  }, [user]);

  const handleSaveFavorite = async (recipe) => {
    try {
      await addDoc(collection(db, "favorites"), {
        userId: user.uid,
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
      setFavorites((prev) => [...prev, recipe]);
    } catch (err) {
      setError("Failed to save favorite");
    }
  };

  const handleRemoveFavorite = async (recipeId) => {
    try {
      const favoriteToRemove = favorites.find((fav) => fav.recipeId === recipeId);
      if (favoriteToRemove) {
        await deleteDoc(doc(db, "favorites", favoriteToRemove.id));
        setFavorites(favorites.filter((fav) => fav.recipeId !== recipeId));
      }
    } catch (err) {
      setError("Failed to remove favorite");
    }
  };

  return (
    <div>
      <h3>Your Favorite Recipes</h3>
      {error && <p>{error}</p>}
      <ul>
        {favorites.map((recipe) => (
          <li key={recipe.recipeId}>
            <h4>{recipe.title}</h4>
            <img src={recipe.image} alt={recipe.title} width="100" />
            <button onClick={() => handleRemoveFavorite(recipe.recipeId)}>
              Remove from favorites
            </button>
          </li>
        ))}
      </ul>
      {user && (
        <div>
          <h3>Save this recipe to your favorites:</h3>
          <button onClick={() => handleSaveFavorite({ id: "123", title: "Sample Recipe", image: "recipe.jpg" })}>
            Save to Favorites
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
