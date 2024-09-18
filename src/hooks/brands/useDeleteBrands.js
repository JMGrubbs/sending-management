import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useDeleteBrands() {
    const [brand, setDataPartner] = useState([])
    const [loadingBrand, setLoadingDataPartner] = useState(false)
    const [errorBrand, setErrorDataPartner] = useState(null)

    const deleteBrands = useCallback(
        async (id) => {
            setLoadingDataPartner(true)
            setErrorDataPartner(null)
            try {
                let url = `/brands/delete?id=${id}`
                const response = await apiClient.delete(url)
                const data = response.data.brand
                setDataPartner(data)
                setLoadingDataPartner(false)
            } catch (error) {
                setErrorDataPartner(error)
                setLoadingDataPartner(false)
            }
        },
        []
    )

    const brandMemo = useMemo(() => {
        return brand;
    }, [brand])

    return {
        brandMemo,
        loadingBrand,
        errorBrand,
        deleteBrands
    };
}