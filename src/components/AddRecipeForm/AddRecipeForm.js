import React, {useRef, useState} from 'react';
import {createRecipe} from '../../api/recipes';
import './addRecipeForm.css';

const AddRecipeForm = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setphoto] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientMeasurement, setIngredientMeasurement] = useState('');
    const [instructions, setInstructions] = useState([]);
    const [instructionInput, setInstructionInput] = useState('');

    const measurementInputRef = useRef(null);
    const addButtonRef = useRef(null);

    // Handle recipe creation
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedInstructions = {};
        instructions.forEach((instruction, index) => {
            formattedInstructions[`step ${index + 1}`] = instruction;
        });


        // Log all form data to the console
        console.log("Recipe created:", {
            title,
            description,
            photo,
            ingredients,
            instructions : JSON.stringify(formattedInstructions)
        });

        const recipeData = {
            title,
            description,
            ingredients,
            instructions : JSON.stringify(formattedInstructions)
        };

        if (photo) {
            const response = await fetch(photo);
            const blob = await response.blob();

            recipeData.photo = new File([blob], 'uploaded_image.jpg', {type: blob.type});
        }

        try {
            const response = await createRecipe(recipeData);
            console.log("Recipe saved successfully:", response);

            setTitle('');
            setDescription('');
            setphoto('');
            setIngredients([]);
            setInstructions([]);
            onClose();
        } catch (error) {
            console.error("Error saving the recipe:", error);
        }
    };

    const addIngredient = () => {
        if (ingredientName.trim() && ingredientMeasurement.trim()) {
            setIngredients([...ingredients, { name: ingredientName.trim(), measurement: ingredientMeasurement.trim() }]);
            setIngredientName('');
            setIngredientMeasurement('');
        }
    };

    const removeIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const addInstruction = () => {
        if (instructionInput.trim()) {
            setInstructions([...instructions, instructionInput.trim()]);
            setInstructionInput('');
        }
    };

    const removeInstruction = (index) => {
        const newInstructions = instructions.filter((_, i) => i !== index);
        setInstructions(newInstructions);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setphoto(URL.createObjectURL(file)); // Preview the image
        }
    };

    const deletePhoto = () => {
        setphoto('');
    };

    const handleNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            measurementInputRef.current.focus();
        }
    };

    const handleMeasurementKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addIngredient();
            addButtonRef.current.focus();
        }
    };

    // Handle enter key on instruction input
    const handleInstructionKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addInstruction();
        }
    };

    return (
        <div className="add-recipe-card">
            <form className="add-recipe-form" onSubmit={handleSubmit}>
                <h2 className="add-recipe-title">Add Recipe</h2>

                <div className="form-section">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-section">
                    <label>Photo:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                    />
                    {photo && (
                        <div className="photo-preview">
                            <img src={photo} alt="Preview" className="photo-thumbnail" />
                            <button type="button" className="remove-photo-button" onClick={deletePhoto}>
                                Remove Photo
                            </button>
                        </div>
                    )}
                </div>

                <div className="form-section">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={3}
                        style={{ resize: 'vertical' }}
                    />
                </div>

                <div className="form-section">
                    <label>Ingredients:</label>
                    <div className="ingredient-input">
                        <input
                            type="text"
                            value={ingredientName}
                            onChange={(e) => setIngredientName(e.target.value)}
                            placeholder="Ingredient Name"
                            onKeyDown={handleNameKeyDown}
                        />
                        <input
                            type="text"
                            ref={measurementInputRef}
                            value={ingredientMeasurement}
                            onChange={(e) => setIngredientMeasurement(e.target.value)}
                            placeholder="Measurement"
                            onKeyDown={handleMeasurementKeyDown}
                        />
                        <button
                            type="button"
                            ref={addButtonRef}
                            onClick={addIngredient}
                            className="add-ingredient-button"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="ingredient-list">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className="ingredient-item">
                                {ingredient.name} - {ingredient.measurement}
                                <button
                                    type="button"
                                    className="remove-ingredient"
                                    onClick={() => removeIngredient(index)}
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="form-section">
                    <label>Instructions:</label>
                    <div className="instruction-input">
                        <input
                            type="text"
                            value={instructionInput}
                            onChange={(e) => setInstructionInput(e.target.value)}
                            onKeyDown={handleInstructionKeyDown}
                            placeholder="Type an instruction and press Enter"
                        />
                    </div>
                    <ul className="instruction-list">
                        {instructions.map((instruction, index) => (
                            <li key={index} className="instruction-item">
                                {instruction}
                                <button
                                    type="button"
                                    className="remove-instruction"
                                    onClick={() => removeInstruction(index)}
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="button-container">
                    <button type="button" className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="save-button">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddRecipeForm;
