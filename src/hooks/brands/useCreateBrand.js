import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useCreateBrand() {
    const [newBrand, setNewBrand] = useState([])
    const [loadingNewBrand, setLoadingNewBrand] = useState(false)
    const [errorNewBrand, setErrorNewBrand] = useState(null)

    const createBrand = useCallback(
        async (payload) => {
            setLoadingNewBrand(true)
            setErrorNewBrand(null)
            try {
                let url = `/brands/create`
                const response = await apiClient.post(url, payload)
                const data = response.data.brand
                setNewBrand(data)
                setLoadingNewBrand(false)
            } catch (error) {
                console.error(error)
                setErrorNewBrand(error)
                setLoadingNewBrand(false)
            }
        },
        []
    )

    const newBrandMemo = useMemo(() => {
        return newBrand[0];
    }, [newBrand])

    return {
        newBrandMemo,
        loadingNewBrand,
        errorNewBrand,
        createBrand
    };
}