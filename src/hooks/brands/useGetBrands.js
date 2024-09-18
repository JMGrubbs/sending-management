import { useCallback, useMemo, useState } from "react";
import apiClient from "../../services/api_service";

export default function useGetBrands() {
    const [brands, setBrands] = useState([])
    const [loadingBrands, setLoadingBrands] = useState(false)
    const [errorBrands, setBrandErrors] = useState(null)

    const getBrands = useCallback(
        async (payload = null) => {
            setLoadingBrands(true);
            setBrandErrors(null);

            try {
                const queryParams = new URLSearchParams();
                if (payload) {
                    Object.keys(payload).forEach(key => {
                        if (payload[key] !== null && payload[key] !== undefined) {
                            if (Array.isArray(payload[key])) {
                                payload[key].forEach(value => {
                                    queryParams.append(key, value);
                                });
                            } else {
                                queryParams.append(key, payload[key]);
                            }
                        }
                    });
                }
                const url = `/brands/get?${queryParams.toString()}`;
                const response = await apiClient.get(url);

                const data = response.data.brands;
                setBrands(data);
                setLoadingBrands(false);
            } catch (error) {
                setBrandErrors(error);
                setLoadingBrands(false);
            }
        },
        []
    );


    const brandsMemo = useMemo(() => {
        return brands
    }, [brands])

    return {
        brandsMemo,
        loadingBrands,
        errorBrands,
        getBrands
    };
}