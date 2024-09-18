import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useCreateEventSummary() {
    const [newEventSummary, setNewEventSummary] = useState({})
    const [loadingNewEventSummary, setLoadingNewEventSummary] = useState(false)
    const [errorNewEventSummary, setErrroNewEventSummary] = useState(null)

    const createEventSummary = useCallback(
        async (new_summary_obj) => {
            setLoadingNewEventSummary(true)
            setErrroNewEventSummary(null)
            try{
                const response = await apiClient.post('/event_summaries/create', new_summary_obj)
                const data = response.data.summary
                setNewEventSummary(data)
                setLoadingNewEventSummary(false)
            } catch (error){
                setErrroNewEventSummary(error)
                setLoadingNewEventSummary(false)
            }
        },
        []
    )

    const eventSummaryMemo = useMemo(() => {
        return newEventSummary
    }, [newEventSummary])

    return {
        eventSummaryMemo,
        loadingNewEventSummary,
        errorNewEventSummary,
        createEventSummary
    };
}