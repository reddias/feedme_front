import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {getUserFromLocalStorage} from '../../utils/authHelper';
import {getPopularRecipes} from '../../api/recipes';
import RecipeCard from "../../components/Recipes/CardVertical/RecipeCard";
import './dashboard.css';

const Dashboard = () => {
    const user = getUserFromLocalStorage();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [allRecipes, setAllRecipes] = useState([]);
    const [popularRecipes, setPopularRecipes] = useState([]);
    const [recipesToShow, setRecipesToShow] = useState(4);

    useEffect(() => {
        fetchPopularRecipes();
    }, []);

    const fetchPopularRecipes = async () => {
        try {
            const data = await getPopularRecipes();
            setAllRecipes(data.data);
            setPopularRecipes(data.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/recipes?query=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleShowMore = () => {
        setRecipesToShow(popularRecipes.length);
    };

    const handleShowLess = () => {
        setRecipesToShow(4);
    };

    const showMoreButtonVisible = popularRecipes.length > 4 && recipesToShow < popularRecipes.length;
    const showLessButtonVisible = recipesToShow > 4;

    return (
        <div className="app-container">
            <Header user={user}/>

            <div className="dashboard-background-image"></div>

            <div className="dashboard-container">

                <div className='dashboard-search-container'>
                    <h1 className='dashboard-search-bar-label'>Find Recipes</h1>
                    <div className="dashboard-search-bar">
                        <input
                            type="text"
                            placeholder="Search for recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="dashboard-search-input"
                        />
                        <button onClick={handleSearch} className="dashboard-search-button">
                            Search
                        </button>
                    </div>
                </div>

                {/* Popular Recipes Section */}
                <div className="dashboard-popular-recipes">
                    <h2 className='dashboard-popular-recipes-h2'>Most Popular Recipes</h2>
                    <div className="popular-recipes-grid">
                        {popularRecipes.slice(0, recipesToShow).map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe}/>
                        ))}
                    </div>

                    <div className="popular-recipes-controls">
                        {showMoreButtonVisible && (
                            <button onClick={handleShowMore} className="popular-recipes-show-more-button">
                                Show More
                            </button>
                        )}
                        {showLessButtonVisible && (
                            <button onClick={handleShowLess} className="popular-recipes-show-less-button">
                                Show Less
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Dashboard;