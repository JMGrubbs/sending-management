import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useDeleteDataPartner() {
    const [dataPartner, setDataPartner] = useState([])
    const [loadingDataPartner, setLoadingDataPartner] = useState(false)
    const [errorDataPartern, setErrorDataPartner] = useState(null)

    const deleteDataPartner = useCallback(
        async (id) => {
            setLoadingDataPartner(true)
            setErrorDataPartner(null)
            try {
                let url = `/data_partners/delete?id=${id}`
                const response = await apiClient.delete(url)
                const data = response.data.deleted_data_partner
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
        deleteDataPartner
    };
}