import { ApiManager } from "@/lib/api-manager"

export const FetchFindFindManyCategory = async () => {
    try {
        const fetch = await ApiManager(`/category`);
        
        return fetch.data
    } catch (error) {
        throw error
    }
}

export const FetchFindOneCategory= async ({id}: {id: number}) => {
    try {
        const fetch = await ApiManager(`/category/${id}`)

        return fetch.data
    } catch (error) {
        throw error
    }
}

export const CreateCategory = async ({data}: {data: {title: string}}) => {
    try {
        const fetch = await ApiManager(`/category`, {
            method: 'POST',
            data: data
        })

        return fetch.data
    } catch (error) {
        throw error
    }
}

export const UpdateCategory = async ({data, id}: {data: {title: string}, id: number}) => {
    try {
        const fetch = await ApiManager(`/category/${id}`, {
            method: 'PATCH',
            data: data
        })

        return fetch.data
    } catch (error) {
        throw error
    }
}