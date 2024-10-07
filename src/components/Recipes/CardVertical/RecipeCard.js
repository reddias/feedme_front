import React, {useEffect, useRef, useState} from 'react';
import './recipeCard.css';
import Modal from '../../Modal/Modal';
import RecipeView from '../../RecipeView/RecipeView';
import {getRecipeById, cloneRecipe, deleteRecipe, updateRecipe} from '../../../api/recipes';

const RecipeCard = ({recipe, isUserRecipe, onDelete}) => {
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

    const toggleDropdown = (e) => {
        e.stopPropagation();  // Prevent modal opening on dropdown click
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

    const truncatedDescription = description.length > 100
        ? description.slice(0, 100) + '...'
        : description;

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

    const openModal = async () => {
        await fetchRecipeById(id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="recipe-card-component" onClick={openModal}>
                <div className="recipe-card-image">
                    {photo_url ? (
                        <img src={photo_url} alt={title}/>
                    ) : (
                        <div className="recipe-card-no-image">No Image</div>
                    )}
                </div>
                <div className="recipe-card-info">
                    <p className="recipe-card-title">{title}</p>
                    <p className="recipe-card-description">{truncatedDescription}</p>
                    <div className="recipe-card-stats">
                        <span>👁 {view_count}</span>
                        <span>❤️ {likes_count}</span>
                        <span>💬 {comments_count}</span>
                    </div>
                </div>
                <div className="recipe-card-dropdown" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
                    <button className="recipe-card-dropdown-toggle" onClick={toggleDropdown}>
                        &#x2026;
                    </button>
                    {isDropdownOpen && (
                        <ul className="recipe-card-dropdown-menu">
                            {isUserRecipe ? (
                                <>
                                    <li>Edit Recipe</li>
                                    <li onClick={removeRecipe}>Delete Recipe</li>
                                </>
                            ) : (
                                <li onClick={postCloneRecipe}>Clone to My Recipes</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
            {detailedRecipe && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <RecipeView recipe={detailedRecipe}/>
                </Modal>
            )}
        </>
    );
};

export default RecipeCard;
