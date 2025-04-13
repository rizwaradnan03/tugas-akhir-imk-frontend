import { ApiManager } from "@/lib/api-manager"

export const FetchFindFindManyProducts = async () => {
    try {
        const fetch = await ApiManager(`/product`);
        
        return fetch.data
    } catch (error) {
        throw error
    }
}

export const FetchFindOneProduct = async ({id}: {id: number}) => {
    try {
        const fetch = await ApiManager(`/product/${id}`)

        console.log("fetch find one", fetch.data)

        return fetch.data
    } catch (error) {
        throw error
    }
}