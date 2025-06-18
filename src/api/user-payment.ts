import { ApiManager } from "@/lib/api-manager"

export const FetchFindFindManyUserPayment = async () => {
    try {
        const fetch = await ApiManager(`/user-payment`);
        
        return fetch.data
    } catch (error) {
        throw error
    }
}

export const FetchFindOneUserPayment = async ({id}: {id: number}) => {
    try {
        const fetch = await ApiManager(`/user-payment/${id}`)

        return fetch.data
    } catch (error) {
        throw error
    }
}

export const ShippedPayment = async ({id}: {id: number}) => {
    try {
        const shipped = await ApiManager(`/user-payment/shipped/${id}`)
        
        return shipped.data
    } catch (error) {
        throw error
    }
}