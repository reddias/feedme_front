import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {getUserFromLocalStorage} from '../../utils/authHelper';
import {getRecipes} from '../../api/recipes'; // Simulated API call for fetching recipes
import './recipeSearch.css';
import RecipeCard from "../Recipes/Card/RecipeCard"; // Custom CSS for styling

const RecipeSearchPage = () => {
    const user = getUserFromLocalStorage();

    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [popularity, setPopularity] = useState(''); // 'high', 'medium', 'low'
    const [minCookingTime, setMinCookingTime] = useState(0);
    const [maxCookingTime, setMaxCookingTime] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch recipes when the component mounts or when filters change
    useEffect(() => {
        fetchRecipes();
    }, [searchTerm, popularity, maxCookingTime]);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const data = await getRecipes();
            console.log(data);
            setRecipes(data.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePopularityChange = (e) => {
        setPopularity(e.target.value);
    };


    const handleClearFilters = () => {
        setSearchTerm('');
        setPopularity('');
        setMaxCookingTime('');
        setMinCookingTime('');
    };

    const handleMinCookingTimeChange = (e) => {
        setMinCookingTime(e.target.value);
    };

    const handleMaxCookingTimeChange = (e) => {
        setMaxCookingTime(e.target.value);
    };

    return (
        <>
            <Header user={user}/>

            <div className="recipe-search-page">
                <div className="sidebar">
                    <div className="filter-header">
                        <h3 className="h3-search-recipe">Filter</h3>
                        <button className="clear-filters" onClick={handleClearFilters}>Clear All</button>
                    </div>
                    <div className="filter-section">
                        <label>Sort by</label>
                        <select value={popularity} onChange={handlePopularityChange}>
                            <option value="">All</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    {/* Cooking Time Filter */}
                    <div className="filter-section">
                        <label>Cooking Time (in mins)</label>
                        <div className="time-range">
                            <div className='time-range-small'>
                                <p className='label-for-recipe-time'>Min:</p>
                                <input
                                    type="number"
                                    min={0}
                                    max={120}
                                    value={minCookingTime}
                                    onChange={handleMinCookingTimeChange}
                                    className="time-input"
                                />
                            </div>
                            <div className="time-range-small">
                                <p className='label-for-recipe-time'>Max:</p>
                                <input
                                    type="number"
                                    min={0}
                                    max={120}
                                    value={maxCookingTime}
                                    onChange={handleMaxCookingTimeChange}
                                    className="time-input"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content: Search bar and recipe list */}
                <div className="content">
                    {/* Search Bar */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for recipes..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    {/* Recipe List */}
                    {loading ? (
                        <div className="loading">Loading recipes...</div>
                    ) : (
                        <div className="recipes-grid">
                            {recipes.length > 0 ? (
                                recipes.map((recipe) => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        isUserRecipe={false}
                                    />
                                ))
                            ) : (
                                <p>No recipes found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer/>
        </>
    );
};

export default RecipeSearchPage;
