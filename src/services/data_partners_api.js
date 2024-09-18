import apiClient from './api_service';

export const fetchDataPartners = async () => {
    try {
        const response = await apiClient.get('/data_partners/get');
        return response.data["data_partners"];
    } catch (error) {
        console.error('Error fetching data_partners data', error);
    }
    return [];
};

export const uploadCSVData = async (partnerId, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post(`/data_partners/${partnerId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading data', error);
    }
}