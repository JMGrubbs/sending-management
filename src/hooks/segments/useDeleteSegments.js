import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useDeleteSegments() {
    const [deletedSegment, setDeletedSegment] = useState([])
    const [loadingDeletedSegment, setLoadingDeleteSegment] = useState(false)
    const [errorDeletedSegment, setErrorDeletedSegment] = useState(null)

    const deleteSegments = useCallback(
        async (segment_id) => {
            setLoadingDeleteSegment(true)
            setErrorDeletedSegment(null)
            try{
                let url = `/event_segments/delete`;
                if (segment_id) {
                    url = url + `?id=${segment_id}`
                }
                const response = await apiClient.delete(url)
                const data = response.data.deleted_segment
                setDeletedSegment(data)
                setLoadingDeleteSegment(false)
            } catch (error){
                setErrorDeletedSegment(error)
                setLoadingDeleteSegment(false)
            }
        },
        []
    )

    const deletedSegmentMemo = useMemo(() => {
        return deletedSegment
    }, [deletedSegment])

    return {
        deletedSegmentMemo,
        loadingDeletedSegment,
        errorDeletedSegment,
        deleteSegments
    };
}