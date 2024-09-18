import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useUpdateDataPartner() {
    const [dataPartner, setDataPartner] = useState([])
    const [loadingDataPartner, setLoadingDataPartner] = useState(false)
    const [errorDataPartern, setErrorDataPartner] = useState(null)

    const updateDataPartner = useCallback(
        async (payload) => {
            setLoadingDataPartner(true)
            setErrorDataPartner(null)
            try {
                let url = `/data_partners/update`
                const response = await apiClient.patch(url, payload)
                const data = response.data.data_partner
                setDataPartner(data)
                setLoadingDataPartner(false)
            } catch (error) {
                setErrorDataPartner(error)
                setLoadingDataPartner(false)
            }
        },
        []
    )

    const dataPartnerMemo = useMemo(() => {
        return dataPartner;
    }, [dataPartner])

    return {
        dataPartnerMemo,
        loadingDataPartner,
        errorDataPartern,
        updateDataPartner
    };
}