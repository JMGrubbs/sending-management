import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useUpdateBrands() {
    const [updateBrand, setUpdateBrand] = useState([])
    const [loadingUpdateBrand, setLoadingUpdateBrand] = useState(false)
    const [errorUpdatedBrand, setErrorUpdateBrand] = useState(null)

    const updateBrands = useCallback(
        async (payload) => {
            setLoadingUpdateBrand(true)
            setErrorUpdateBrand(null)
            try {
                let url = `/brands/update`
                const response = await apiClient.patch(url, payload)
                const data = response.data.data_partner
                setUpdateBrand(data)
                setLoadingUpdateBrand(false)
            } catch (error) {
                setErrorUpdateBrand(error)
                setLoadingUpdateBrand(false)
            }
        },
        []
    )

    const updatedBrandMemo = useMemo(() => {
        return updateBrand;
    }, [updateBrand])

    return {
        updatedBrandMemo,
        loadingUpdateBrand,
        errorUpdatedBrand,
        updateBrands
    };
}