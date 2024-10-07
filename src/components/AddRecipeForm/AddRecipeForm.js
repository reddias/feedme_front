import React, { useState, useRef } from 'react';
import { createRecipe } from '../../api/recipes';
import './addRecipeForm.css';

const AddRecipeForm = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo_url, setphoto_url] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientMeasurement, setIngredientMeasurement] = useState('');
    const [instructions, setInstructions] = useState([]); // Keep instructions as an array
    const [instructionInput, setInstructionInput] = useState('');

    const measurementInputRef = useRef(null); // For focusing on measurement after name
    const addButtonRef = useRef(null); // For focusing on Add button after measurement

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
            photo_url,
            ingredients,
            instructions : JSON.stringify(formattedInstructions)
        });

        // Prepare the recipe data for the API call
        const recipeData = {
            title,
            description,
            photo_url,
            ingredients,
            instructions : JSON.stringify(formattedInstructions)
        };

        try {
            const response = await createRecipe(recipeData); // Ensure this function awaits the promise
            console.log("Recipe saved successfully:", response);

            setTitle('');
            setDescription('');
            setphoto_url('');
            setIngredients([]);
            setInstructions([]);
            onClose(); // Close the modal after successful submission
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
            setInstructions([...instructions, instructionInput.trim()]); // Add instruction as a string
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
            setphoto_url(URL.createObjectURL(file)); // Preview the image
        }
    };

    const deletePhoto = () => {
        setphoto_url(''); // Remove the photo URL
    };

    const handleNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            measurementInputRef.current.focus(); // Focus on measurement input
        }
    };

    const handleMeasurementKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            addIngredient(); // Add ingredient when Enter is pressed
            addButtonRef.current.focus(); // Focus on Add button (optional)
        }
    };

    // Handle enter key on instruction input
    const handleInstructionKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            addInstruction(); // Add instruction on Enter
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
                    {photo_url && (
                        <div className="photo-preview">
                            <img src={photo_url} alt="Preview" className="photo-thumbnail" />
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
                        style={{ resize: 'vertical' }} // Allow vertical resizing
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
                            onKeyDown={handleNameKeyDown} // Move to measurement on Enter
                        />
                        <input
                            type="text"
                            ref={measurementInputRef} // Ref for focusing measurement input
                            value={ingredientMeasurement}
                            onChange={(e) => setIngredientMeasurement(e.target.value)}
                            placeholder="Measurement"
                            onKeyDown={handleMeasurementKeyDown} // Add ingredient on Enter
                        />
                        <button
                            type="button"
                            ref={addButtonRef} // Ref for focusing Add button
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
                            onKeyDown={handleInstructionKeyDown} // Add instruction on Enter
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
