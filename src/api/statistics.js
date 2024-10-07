import api from './api';
import {handleApiError} from "../utils/errorHandler";

export const fetchStatistics = async () => {
    try {
        const response = await api.get('/statistics');

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
