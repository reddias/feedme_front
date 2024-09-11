import api from './api';
import {handleApiError} from "../utils/errorHandler";

export const createComment = async (recipeId, message) => {
    try {
        const response = await api.post('/comments', {recipe_id: recipeId, message});
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getComments = async (recipeId, page = 1) => {
    try {
        const response = await api.get('/comments', {params: {recipe_id: recipeId, page}});
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getCommentById = async (id) => {
    try {
        const response = await api.get(`/comments/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteComment = async (id) => {
    try {
        const response = await api.delete(`/comments/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};