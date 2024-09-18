import apiClient from './api_service';

export const fetchSegments = async () => {
    try {
        const response = await apiClient.get('/segments/');
        return response.data["segments"];
    } catch (error) {
        console.error('Error fetching data', error);
    }
    return [];
};

export const createSegments = async (newSegment) => {
    try {
        const response = await apiClient.post('/segments/create', newSegment);
        return response.data["segments"];
    } catch (error) {
        console.error('Error fetching data', error);
    }
    return [];
};

export const deleteSegmentCall = async (segmentId) => {
    try {
        const response = await apiClient.delete(`/segments/${segmentId}/delete`);
        return response.data["segments"];
    } catch (error) {
        console.error('Error fetching data', error);
    }
    return [];
}

export const getOperations = async () => {
    try {
        const response = await apiClient.get('/segments/params');
        return response.data["params"];
    } catch (error) {
        console.error('Error fetching data', error);
    }
    return [];
}