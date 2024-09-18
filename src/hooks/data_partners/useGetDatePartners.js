import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useGetDataPartners() {
    const [dataPartners, setDataPartners] = useState([])
    const [loadingDataPartners, setLoadingDataPartners] = useState(false)
    const [errorDataParterns, setErrorDataPartners] = useState(null)

    const getDataPartners = useCallback(
        async () => {
            setLoadingDataPartners(true)
            setErrorDataPartners(null)
            try {
                const response = await apiClient.get('/data_partners/get')
                const data = response.data.data_partners
                setDataPartners(data)
                setLoadingDataPartners(false)
            } catch (error) {
                setErrorDataPartners(error)
                setLoadingDataPartners(false)
            }
        },
        []
    )

    const dataPartnersMemo = useMemo(() => {
        return dataPartners;
    }, [dataPartners])

    return {
        dataPartnersMemo,
        loadingDataPartners,
        errorDataParterns,
        getDataPartners
    };
}