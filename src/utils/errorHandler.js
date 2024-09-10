export const handleApiError = (error) => {
    if (error.response) {

        console.error('API Error:', error.response?.message || error.message);

        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    } else {
        console.error('Network Error:', error.message);
    }

    throw error;
};
