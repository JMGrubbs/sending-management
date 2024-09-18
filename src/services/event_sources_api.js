import apiClient from './api_service';

export const fetchEventSources = async (status = null) => {
    try {
        let url = '/eventsummarysources/get'
        if (status != null) {
            url += `?status=${status}`
        }
        const response = await apiClient.get(url);
        return response.data.sources;
    } catch (error) {
        console.error('Error fetching data', error);
    }
    return [];
};

export const deleteEventSources = async (id) => {
    try {
        const response = await apiClient.delete(`/eventsummarysources/delete?id=${id}`);
        return response.data.status;
    } catch (error) {
        console.error('Error fetching data', error);
    }
    return "error";
};
