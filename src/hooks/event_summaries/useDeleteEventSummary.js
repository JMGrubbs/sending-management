import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useDeleteEventSummary() {
    const [deletedEventSummary, setDeletedEventSummary] = useState({})
    const [loadingDeletedEventSummary, setLoadingDeletedEventSummary] = useState(false)
    const [errorDeletedEventSummary, setErrroDeletedEventSummary] = useState(null)

    const deleteEventSummary = useCallback(
        async (id) => {
            setLoadingDeletedEventSummary(true)
            setErrroDeletedEventSummary(null)
            try{
                let url = `/event_summaries/delete?id=${id}`;
                const response = await apiClient.delete(url)
                const data = response.data.summary
                setDeletedEventSummary(data)
                setLoadingDeletedEventSummary(false)
            } catch (error){
                setErrroDeletedEventSummary(error)
                setLoadingDeletedEventSummary(false)
            }
        },
        []
    )

    const deletedEventSummaryMemo = useMemo(() => {
        return deletedEventSummary
    }, [deletedEventSummary])

    return {
        deletedEventSummaryMemo,
        loadingDeletedEventSummary,
        errorDeletedEventSummary,
        deleteEventSummary
    };
}