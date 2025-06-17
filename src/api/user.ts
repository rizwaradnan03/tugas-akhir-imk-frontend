import { ApiManager } from "@/lib/api-manager"

export const RegisterAdmin = async ({data}: {data: {email: string, password: string}}) => {
    try {
        const register = await ApiManager(`/user`, {
            method: 'POST',
            data: data
        })       
        
        return register.data
    } catch (error) {
        throw error
    }
}

export const FetchFindManyUser = async () => {
    try {
        const fetch = await ApiManager(`/user`)
        
        return fetch.data
    } catch (error) {
        throw error
    }
}