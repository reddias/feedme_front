import React, { useEffect, useState } from 'react';
import RecipeCard from './Card/RecipeCard';
import { getRecipes } from '../../api/recipes';
import './recipes.css';

const Recipes = ({ isUserPage }) => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipes();
    }, [page]);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const data = await getRecipes(page);
            console.log(data);
            setRecipes(data.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRecipe = (deletedRecipeId) => {
        setRecipes((prevRecipes) =>
            prevRecipes.filter((recipe) => recipe.id !== deletedRecipeId)
        );
    };

    return (
        <div className="recipes-container">
            {loading ? (
                <p>Loading recipes...</p>
            ) : (
                <div className="recipes-grid">
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                isUserRecipe={isUserPage}
                                onDelete={handleDeleteRecipe}
                            />
                        ))
                    ) : (
                        <p>No recipes found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Recipes;
