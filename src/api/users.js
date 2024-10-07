import api from './api';
import {handleApiError} from "../utils/errorHandler";

export const createUser = async (userData) => {
    try {
        const formData = new FormData();
        for (let key in userData) {
            if (key === 'photo') {
                formData.append('photo', userData.photo);
            } else {
                formData.append(key, userData[key]);
            }
        }

        const response = await api.post('/users', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/users/me');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateCurrentUser = async (userData) => {
    try {
        const response = await api.put('/users/me', userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteCurrentUser = async () => {
    try {
        const response = await api.delete('/users/me');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateUserStatus = async (id, status) => {
    try {
        const response = await api.patch(`/users/${id}/status`, { status });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateUserRole = async (id, role) => {
    try {
        const response = await api.patch(`/users/${id}/role`, { role });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateUserPhoto = async (photo) => {
    try {
        const formData = new FormData();
        formData.append('photo', photo);

        const response = await api.post('/users/me/photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteUserPhoto = async () => {
    try {
        const response = await api.delete('/users/me/photo');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const changePassword = async (passwordData) => {
    try {
        const response = await api.patch('/users/me/password', passwordData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};