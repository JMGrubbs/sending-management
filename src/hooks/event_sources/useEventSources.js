import { useCallback, useMemo, useState } from "react";
import { fetchEventSources, deleteEventSources } from '../../services/event_sources_api'

export default function useEventSources() {
    const [sourceEventTables, setSourceEventTables] = useState([])
    const [loadingEventSources, setLoadingEventSources] = useState(false)
    const [errorEventSources, setErrorEventSources] = useState(null)

    const getEventSources = useCallback(
        async () => {
            setLoadingEventSources(true);
            setErrorEventSources(null);
            try {
                const response = await fetchEventSources()
                setSourceEventTables(response);
                setLoadingEventSources(false);
            } catch (error) {
                setErrorEventSources(error);
                setLoadingEventSources(false);
            }
        },
        []
    );

    const removeEventSources = useCallback(
        async (id) => {
            setLoadingEventSources(true);
            setErrorEventSources(null);
            try {
                const response = await deleteEventSources(id);
                if (response === "deleted") {
                    setSourceEventTables(prevTables =>
                        prevTables.filter(el => el.id !== id)
                    );
                }
            } catch (error) {
                setErrorEventSources(error);
            } finally {
                setLoadingEventSources(false);
            }
        },
        []
    );

    const sourceEventsMemo = useMemo(() => {
        const sorted = [...sourceEventTables]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return sorted
    }, [sourceEventTables]);

    return { sourceEventsMemo, loadingEventSources, errorEventSources, getEventSources, removeEventSources };
}