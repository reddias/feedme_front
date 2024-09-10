import api from './api';
import {handleApiError} from "../utils/errorHandler";

export const fetchCategories = async (page = 1, perPage = 15, search = '') => {
    try {
        const response = await api.get('/categories', {
            params: {
                page,
                per_page: perPage,
                search
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const fetchCategoryById = async (id) => {
    try {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await api.post('/categories', categoryData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};