import api from './api';
import {handleApiError} from "../utils/errorHandler";

export const createRecipe = async (recipeData) => {

    try {
        const response = await api.post('/recipes', recipeData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getRecipes = async (page = 1, search = '') => {
    try {
        const response = await api.get('/recipes', { params: { page, search } });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getMyRecipes = async (page = 1, search = '') => {
    try {
        const response = await api.get('recipes/myRecipes', { params: { page, search } });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getRecipeById = async (id) => {
    try {
        const response = await api.get(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateRecipe = async (id, recipeData) => {
    try {
        const formData = new FormData();
        for (let key in recipeData) {
            if (key === 'ingredients') {
                recipeData.ingredients.forEach((ingredient, index) => {
                    formData.append(`ingredients[${index}][name]`, ingredient.name);
                    formData.append(`ingredients[${index}][measurement]`, ingredient.measurement);
                });
            } else if (key === 'photo') {
                formData.append('photo', recipeData.photo);
            } else {
                formData.append(key, recipeData[key]);
            }
        }

        const response = await api.post(`/recipes/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteRecipe = async (id) => {
    try {
        const response = await api.delete(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const cloneRecipe = async (id) => {
    try {
        const response = await api.post(`/recipes/${id}/clone`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const getPopularRecipes = async () => {
    try {
        const response = await api.get('/recipes/mostPopular');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateRecipePhoto = async (id, photo) => {
    try {
        const formData = new FormData();
        formData.append('photo', photo);

        const response = await api.post(`/recipes/${id}/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteRecipePhoto = async (id) => {
    try {
        const response = await api.delete(`/recipes/${id}/photo`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};