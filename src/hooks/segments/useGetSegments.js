import { useCallback, useMemo, useState, useRef } from "react";
import apiClient from "../../services/api_service";

export default function useGetSegments() {
    const [segments, setSegments] = useState([])
    const [loadingSegments, setLoadingSegments] = useState(false)
    const [errorEventSegments, setErrorSegments] = useState(null)
    const segmentsRef = useRef(0);

    const getSegments = useCallback(
        async () => {
            setLoadingSegments(true)
            setErrorSegments(null)
            segmentsRef.current += 1;
            const currentRef = segmentsRef.current;
            try{
                let url = `/event_segments/get`;
                const response = await apiClient.get(url)
                const data = response.data.segments
                if (currentRef === segmentsRef.current) {
                    setSegments(data);
                }
                setLoadingSegments(false)
            } catch (error){
                setErrorSegments(error)
                setLoadingSegments(false)
            }
        }, []
    )

    const segmentsMemo = useMemo(() => {
        const sorted = [...segments]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return sorted
    }, [segments])

    return {
        segmentsMemo,
        loadingSegments,
        errorEventSegments,
        getSegments
    };
}