import { useCallback, useMemo, useState } from "react";
import { fetchEventSummaryRules } from '../../services/event_summaries_api'

export default function useGetEventSummaryRules() {
    const [eventSummaryRules, setEventSummaryRules] = useState([])
    const [loadingEventSummaryRules, setLoadingEventSummaryRules] = useState(false)
    const [errorEventSummaryRules, setErrroEventSummariesRules] = useState(null)

    const getEventSummaryRules = useCallback(
        async () => {
            setLoadingEventSummaryRules(true);
            setErrroEventSummariesRules(null);
            try {
                const response = await fetchEventSummaryRules()
                setEventSummaryRules(response);
                setLoadingEventSummaryRules(false);
            } catch (error) {
                setErrroEventSummariesRules(error);
                setLoadingEventSummaryRules(false);
            }
        },
        []
    );

    const eventSummaryRulesMemo = useMemo(() => {
        return eventSummaryRules
    }, [eventSummaryRules]);

    return {
        eventSummaryRulesMemo,
        loadingEventSummaryRules,
        errorEventSummaryRules,
        getEventSummaryRules,
    };
}