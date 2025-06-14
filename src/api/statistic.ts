import { ApiManager } from "@/lib/api-manager"

export const Statistic = async () => {
    try {
        const fetch = await ApiManager(`/statistic`)
        
        return fetch.data
    } catch (error) {
        throw error
    }
}