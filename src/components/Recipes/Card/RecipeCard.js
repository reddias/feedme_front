import React, {useEffect, useRef, useState} from 'react';
import './recipeCard.css';

const RecipeCard = ({ recipe, isUserRecipe }) => {
    const {
        title,
        description,
        photo_url,
        view_count,
        likes_count,
        comments_count,
        creator_name,
    } = recipe;


    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const truncatedDescription = description.length > 150
        ? description.slice(0, 150) + '...'
        : description;

    return (
        <div className="recipe-card">
            <div className="recipe-image">
                {photo_url ? (
                    <img src={photo_url} alt={title}/>
                ) : (
                    <div className="no-image">No Image</div>
                )}
            </div>
            <div className="recipe-info">
                <div className="recipe-header">
                    <h2 className="recipe-title">{title}</h2>
                </div>
                <p className="recipe-description">{truncatedDescription}</p>
                <div className="recipe-buttons">
                    <p className="recipe-stats">Views: {view_count}</p>
                    <p className="recipe-stats">Likes: {likes_count}</p>
                    <p className="recipe-stats">Comments: {comments_count}</p>
                    <p className="recipe-creator">Creator: {creator_name}</p>
                </div>
            </div>
            <div className="dropdown" ref={dropdownRef}>
                <button className="dropdown-toggle" onClick={toggleDropdown}>
                    &#x2026; {/* Horizontal ellipsis */}
                </button>
                {isDropdownOpen && (
                    <ul className="dropdown-menu">
                        {isUserRecipe ? (
                            <>
                                <li>Edit Recipe</li>
                                <li>Delete Recipe</li>
                            </>
                        ) : (
                            <li>Clone to My Recipes</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default RecipeCard;