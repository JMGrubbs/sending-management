import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useGetEventSummaries() {
    const [eventSummaries, setEventSummaries] = useState([])
    const [loadingEventSummaries, setLoadingEventSummaries] = useState(false)
    const [errorEventSummaries, setErroEventSummaries] = useState(null)

    const getEventSummaries = useCallback(
        async (brand_id) => {
            setLoadingEventSummaries(true)
            setErroEventSummaries(null)
            try{
                let url = `/event_summaries/get`;
                if (brand_id){
                    url += `?brand_id=${brand_id}`;
                };
                const response = await apiClient.get(url)
                const data = response.data.summaries
                setEventSummaries(data)
                setLoadingEventSummaries(false)
            } catch (error){
                setErroEventSummaries(error)
                setLoadingEventSummaries(false)
            }
        },
        []
    )

    const eventSummariesMemo = useMemo(() => {
        const sorted = [...eventSummaries]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return sorted
    }, [eventSummaries])

    return {
        eventSummariesMemo,
        loadingEventSummaries,
        errorEventSummaries,
        getEventSummaries
    };
}