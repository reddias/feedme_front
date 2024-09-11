import api from './api'; // Your Axios instance
import {handleApiError} from "../utils/errorHandler";

export const toggleLike = async (recipeId) => {
    try {
        const response = await api.post('/likes', { recipe_id: recipeId });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};