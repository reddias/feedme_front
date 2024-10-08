import React, { useState, useEffect } from 'react';
import NavigationDrawer from '../../../components/Admin/NavigationDrawer/NavigationDrawer';
import Header from '../../../components/Admin/Header/Header';
import { getUserFromLocalStorage } from "../../../utils/authHelper"; // Ensure getRecipes is correctly imported
import { getRecipes } from "../../../api/recipes";
import './recipes.css';

const Recipes = () => {
    const user = getUserFromLocalStorage();
    const [activeTab, setActiveTab] = useState('pending');
    const [menuOpen, setMenuOpen] = useState(null);
    const [allRecipes, setAllRecipes] = useState([]);

    // Fetch recipes when the component mounts
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipesData = await getRecipes();
                setAllRecipes(recipesData.data);
            } catch (error) {
                console.error('Fetch failed:', error.message);
            }
        };
        fetchRecipes(); // Call the fetch function
    }, []); // Empty dependency array to run only once when the component mounts

    // Example filter based on status (you'll need to adapt this based on the actual data)
    const pendingRecipes = allRecipes.filter(recipe => recipe.status === 'pending');
    const rejectedRecipes = allRecipes.filter(recipe => recipe.status === 'rejected');
    const approvedRecipes = allRecipes.filter(recipe => recipe.status === 'approved');

    const renderRecipeList = () => {
        const recipesToDisplay = activeTab === 'pending' ? pendingRecipes :
            activeTab === 'rejected' ? rejectedRecipes : approvedRecipes;

        return recipesToDisplay.length > 0 ? (
            <div className="recipe-list">
                {/* Table headers */}
                <div className="recipe-list-header">
                    <div>Title</div>
                    <div>Creator</div>
                    <div>Views</div>
                    <div>Likes</div>
                    <div>Comments</div>
                </div>

                {recipesToDisplay.map(recipe => (
                    <div className="recipe-item" key={recipe.id}>
                        <div>{recipe.title}</div>
                        <div>{recipe.creator_name}</div>
                        <div>{recipe.view_count}</div>
                        <div>{recipe.likes_count}</div>
                        <div>{recipe.comments_count}</div>

                        <div className="recipe-options">
                            <button
                                className="options-btn"
                                onClick={() => setMenuOpen(menuOpen === recipe.id ? null : recipe.id)}>
                                &#x2026;
                            </button>

                            {menuOpen === recipe.id && (
                                <div className="options-menu">
                                    <span onClick={() => console.log('Viewing recipe', recipe.id)}>View</span>
                                    <span onClick={() => console.log('Deleting recipe', recipe.id)}>Delete</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>No recipes available in this category.</p>
        );
    };

    return (
        <div>
            <NavigationDrawer />
            <div className="admin-recipes-content">
                <Header user={user} />
                <div className="recipes-tabs-container">
                    {/* Tabs */}
                    <div className="recipes-tabs">
                        <span
                            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pending')}
                        >
                            Pending
                        </span>
                        <span
                            className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
                            onClick={() => setActiveTab('rejected')}
                        >
                            Rejected
                        </span>
                        <span
                            className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
                            onClick={() => setActiveTab('approved')}
                        >
                            Approved
                        </span>
                    </div>

                    {renderRecipeList()}
                </div>
            </div>
        </div>
    );
};

export default Recipes;
