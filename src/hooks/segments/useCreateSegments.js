import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useCreateSegments() {
    const [newSegments, setNewSegments] = useState([])
    const [loadingNewSegments, setLoadingNewSegments] = useState(false)
    const [errorEventNewSegments, setErrorNewSegments] = useState(null)

    const createSegments = useCallback(
        async (new_segment) => {
            setLoadingNewSegments(true)
            setErrorNewSegments(null)
            try {
                const response = await apiClient.post(`/event_segments/create`, new_segment)
                const data = response.data.new_segments
                setNewSegments(data)
                setLoadingNewSegments(false)
            } catch (error){
                setErrorNewSegments(error)
                setLoadingNewSegments(false)
            }
        },
        []
    )

    const newSegmentsMemo = useMemo(() => {
        return newSegments
    }, [newSegments])

    return {
        newSegmentsMemo,
        loadingNewSegments,
        errorEventNewSegments,
        createSegments
    };
}