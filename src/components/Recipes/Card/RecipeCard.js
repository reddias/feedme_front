import React, {useEffect, useRef, useState} from 'react';
import './recipeCard.css';
import Modal from '../../Modal/Modal';
import RecipeView from '../../RecipeView/RecipeView';
import {getRecipeById, cloneRecipe, deleteRecipe, updateRecipe} from '../../../api/recipes';

const RecipeCard = ({recipe, isUserRecipe, onDelete, isAdmin = 0}) => {
    const {
        id,
        title,
        description,
        photo_url,
        view_count,
        likes_count,
        comments_count,
        creator_name,
    } = recipe;

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false); // Modal state
    const [detailedRecipe, setDetailedRecipe] = useState(null); // State to store fetched recipe details
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

    // Fetch single recipe by ID
    const fetchRecipeById = async (recipeId) => {
        const response = await getRecipeById(recipeId);
        setDetailedRecipe(response.data);
    };

    const postCloneRecipe = async () => {
        try {
            await cloneRecipe(id);
            alert('Recipe cloned successfully');
        } catch (error) {
            alert('Failed to clone recipe');
        }
    };

    const removeRecipe = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await deleteRecipe(id);
                alert('Recipe deleted successfully!');
                onDelete(id);
            } catch (error) {
                alert('Failed to delete the recipe. Please try again.');
            }
        }
    };

    const changeRecipe = async () => {
        await updateRecipe(id);
    };

    const openModal = async () => {
        await fetchRecipeById(id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="recipe-card" onClick={openModal}>
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
                {!isAdmin &&
                <div className="dropdown" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        &#x2026;
                    </button>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            {isUserRecipe ? (
                                <>
                                    <li onClick={changeRecipe}>Edit Recipe</li>
                                    <li onClick={removeRecipe}>Delete Recipe</li>
                                </>
                            ) : (
                                <li onClick={postCloneRecipe}>Clone to My Recipes</li>
                            )}
                        </ul>
                    )}
                </div>}
            </div>
            {/* Modal for full recipe details */}
            {detailedRecipe && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <RecipeView recipe={detailedRecipe}/>
                </Modal>
            )}
        </>
    );
};

export default RecipeCard;