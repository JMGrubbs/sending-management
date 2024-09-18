import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useCreateEventSource() {
    const [newEventSource, setNewEventSource] = useState({})
    const [loadingNewEventSource, setLoadingNewEventSource] = useState(false)
    const [errorNewEventSource, setErrroNewEventSource] = useState(null)

    const createEventSource = useCallback(
        async (new_Source_obj) => {
            setLoadingNewEventSource(true)
            setErrroNewEventSource(null)
            try{
                const response = await apiClient.post('/eventsummarysources/create', new_Source_obj)
                const data = response.data.new_event_source
                console.log(data)
                setNewEventSource(data)
                setLoadingNewEventSource(false)
            } catch (error){
                setErrroNewEventSource(error)
                setLoadingNewEventSource(false)
            }
        },
        []
    )

    const newEventSourceMemo = useMemo(() => {
        return newEventSource
    }, [newEventSource])

    return {
        newEventSourceMemo,
        loadingNewEventSource,
        errorNewEventSource,
        createEventSource
    };
}