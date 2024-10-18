import api from './api';
import {handleApiError} from "../utils/errorHandler";

export const approveRecipe = async (id) => {
    try {
        const response = await api.post(`/recipes/${id}/approve`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const rejectRecipe = async (id) => {
    try {
        const response = await api.post(`/recipes/${id}/reject`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};