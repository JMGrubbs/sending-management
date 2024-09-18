import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useCreateDataPartner() {
    const [newDataPartner, setNewDataPartner] = useState([])
    const [loadingNewDataPartner, setLoadingNewDataPartner] = useState(false)
    const [errorNewDataPartern, setErrorNewDataPartner] = useState(null)

    const createDataPartner = useCallback(
        async (payload) => {
            setLoadingNewDataPartner(true)
            setErrorNewDataPartner(null)
            try {
                let url = `/data_partners/create`
                const response = await apiClient.post(url, [payload])
                const data = response.data.data_partner
                setNewDataPartner(data)
                setLoadingNewDataPartner(false)
            } catch (error) {
                console.error(error)
                setErrorNewDataPartner(error)
                setLoadingNewDataPartner(false)
            }
        },
        []
    )

    const newDataPartnerMemo = useMemo(() => {
        return newDataPartner[0];
    }, [newDataPartner])

    return {
        newDataPartnerMemo,
        loadingNewDataPartner,
        errorNewDataPartern,
        createDataPartner
    };
}