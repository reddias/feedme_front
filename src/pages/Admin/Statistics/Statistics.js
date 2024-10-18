import React, { useState, useEffect } from 'react';
import NavigationDrawer from '../../../components/Admin/NavigationDrawer/NavigationDrawer';
import Header from '../../../components/Admin/Header/Header';
import { getUserFromLocalStorage } from "../../../utils/authHelper";
import './statistics.css';
import RecipeCard from '../../../components/Recipes/Card/RecipeCard';
import { fetchStatistics } from "../../../api/statistics";

const Statistics = () => {
    const user = getUserFromLocalStorage();

    // State to store fetched statistics data
    const [statsData, setStatsData] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);  // Loading state for API data

    // Fetch statistics data
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await fetchStatistics();
                setStatsData(data); // Store fetched data
            } catch (error) {
                console.error('Failed to fetch statistics:', error.message);
            } finally {
                setLoadingStats(false); // Stop loading
            }
        };
        fetchStats();
    }, []);

    // Destructure fetched data if available
    const {
        recipes_count,
        recipes_view_count,
        users_status_count,
        top_users_by_recipe_count,
        most_viewed_recipe,
        recipe_status_count
    } = statsData || {};

    return (
        <div>
            <NavigationDrawer />
            <div className="admin-content">
                <Header user={user} />

                <div className={"stats-spacing"}></div>

                {/* First Row */}
                <div className="stats-grid-container">
                    {/* Recipes count */}
                    <div className="stats-tile">
                        <h3>Recipes count</h3>
                        {loadingStats ? (
                            <p>Loading...</p>
                        ) : (
                            <p className='stats-individual'>{recipes_count}</p>
                        )}
                    </div>

                    {/* Recipes views */}
                    <div className="stats-tile">
                        <h3>Recipes views</h3>
                        {loadingStats ? (
                            <p>Loading...</p>
                        ) : (
                            <p className='stats-individual'>{recipes_view_count}</p>
                        )}
                    </div>
                </div>

                {/* Second Row */}
                <div className="stats-grid-container">
                    {/* Recipes by Status */}
                    <div className="stats-tile">
                        <h3>Recipes by Status</h3>
                        {loadingStats ? (
                            <p>Loading...</p>
                        ) : (
                            <ul className="stats-recipes-by-status-list">
                                {recipe_status_count.map((recipeStatus, index) => (
                                    <li key={index}>
                                        <div className="stats-recipes-by-status">
                                            <div>
                                                {recipeStatus.status.charAt(0).toUpperCase() + recipeStatus.status.slice(1)}:
                                            </div>
                                            <div className="stats-recipes-by-status-count">
                                                {recipeStatus.recipe_status_count}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Users by Status */}
                    <div className="stats-tile">
                        <h3>Users</h3>
                        {loadingStats ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                                {users_status_count.map((userStatus, index) => (
                                    <li key={index} className="stats-user-list">
                                        <div>
                                            {userStatus.status.charAt(0).toUpperCase() + userStatus.status.slice(1)}:
                                        </div>
                                        <div className="stats-user-list-count">
                                            {userStatus.users_status_count}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Most Active Users */}
                    <div className="stats-tile">
                        <h3>Most active users (by recipe)</h3>
                        {loadingStats ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                                {top_users_by_recipe_count.map((user, index) => (
                                    <li key={index} className="stats-user-top">
                                        <div>
                                            {user.name}:
                                        </div>
                                        <div className="stats-user-top-count">
                                            {user.recipe_number}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Third Row - Most Viewed Recipe */}
                <div className="stats-most-popular-recipe">
                    {loadingStats ? (
                        <p className="stats-most-popular-recipe-loading">Loading most viewed recipe...</p>
                    ) : (
                        most_viewed_recipe && <RecipeCard recipe={most_viewed_recipe} isAdmin={1} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
