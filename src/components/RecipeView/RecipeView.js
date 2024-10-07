import React from 'react';
import './recipeView.css';
import Comments from '../Comments/Comments';

const RecipeView = ({recipe}) => {
    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipeCard">
            <div className="recipe-view">
                {/* Left Section: Recipe Photo */}
                <div className="recipe-image-view">
                    {recipe.photo_url ? (
                        <img src={recipe.photo_url} alt={recipe.title}/>
                    ) : (
                        <div className="no-image-view">No Image Available</div>
                    )}
                </div>

                {/* Right Section: Recipe Details */}
                <div className="recipe-details">
                    {/* Title and Creator */}
                    <h2 className="recipe-title-view">{recipe.title}</h2>
                    <p className="recipe-creator">
                        Created by: <span>{recipe.user?.full_name || 'Unknown'}</span>
                    </p>

                    {/* Description */}
                    <p className="recipe-description-view">{recipe.description}</p>

                    {/* Main Content: Directions and Ingredients */}
                    <div className="recipe-content">
                        {/* Directions */}
                        <div className="recipe-directions">
                            <h3>Directions:</h3>
                            <ul className="recipe-instructions">
                                {recipe.instructions
                                    ? Object.entries(recipe.instructions).map(([step, instruction], index) => (
                                        <li key={index}>{`${step}: ${instruction}`}</li>
                                    ))
                                    : <li>No instructions available</li>
                                }
                            </ul>
                        </div>

                        {/* Ingredients */}
                        <div className="recipe-ingredients-section">
                            <h3>Ingredients:</h3>
                            <ul className="recipe-ingredients">
                                {recipe.ingredients?.length > 0 ? (
                                    recipe.ingredients.map((ingredient) => (
                                        <li key={ingredient.id}>
                                            {ingredient.name}: {ingredient.measurement}
                                        </li>
                                    ))
                                ) : (
                                    <li>No ingredients available</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Recipe Stats */}
                    <div className="recipe-stats-view">
                        <span>{recipe.view_count} views</span>
                        <span>{recipe.likes_count} likes</span>
                        <span>{recipe.comments_count} comments</span>
                    </div>

                    {/* Footer */}
                    <div className="recipe-footer-view">
                        <span>Cooking Time: {recipe.cooking_time} minutes</span>
                    </div>
                </div>
            </div>
            <Comments comments={recipe.comments} recipeId={recipe.id} />
        </div>
    );
};

export default RecipeView;