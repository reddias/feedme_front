import api from './api';
import {handleApiError} from "../utils/errorHandler";

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {email, password});

        const authHeader = response.headers;

        if (authHeader && authHeader['authorization']) {
            const token = authHeader['authorization'];
            localStorage.setItem('token', token);
        }
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const logout = async () => {
    try {
        const response = await api.get('/auth/logout');
        localStorage.removeItem('token');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
