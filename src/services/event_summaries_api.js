import apiClient from './api_service';

export const fetchEventSummaryRules = async () => {
    try{
        const response = await apiClient.get('/event_summaries/rules')
        return response.data.summary_rules
    } catch (error) {
        console.error("failed to get event_summary_rules", error)
    }
    return [];
}


// export const fetchEventSummaries = async () => {
//     try {
//         const response = await apiClient.get('/eventsummaries');
//         return response.data["summaries"];
//     } catch (error) {
//         console.error('Error fetching data', error);
//     }
//     return [];
// };

// export const createEventSummary = async (eventSummary) => {
//     try {
//         console.log(eventSummary)
//         const response = await apiClient.post('/eventsummaries/create', eventSummary);
//         return response.data["summaries"];
//     } catch (error) {
//         console.error('Error creating data', error);
//     }
//     return [];
// }

// export const deleteEventSummary = async (eventSummaryId) => {
//     try {
//         const response = await apiClient.delete(`/eventsummaries/${eventSummaryId}/delete`);
//         return response.data["summaries"];
//     } catch (error) {
//         console.error('Error deleting data', error);
//     }
//     return [];
// }

// export const fetchEvents = async () => {
//     try {
//         const response = await apiClient.get('/eventsummaries/events/get');
//         return response.data["summary_event_types"];
//     } catch (error) {
//         console.error('Error fetching data', error);
//     }
//     return [];
// }