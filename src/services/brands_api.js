import apiClient from './api_service';

export const fetchBrands = async () => {
    try {
        const response = await apiClient.get('/brands/');
        return response.data["brands"];
    } catch (error) {
        console.error('Error fetching brand data', error);
    }
    return [];
};