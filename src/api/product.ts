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

export const CreateProduct = async ({data}: {data: {title: string, image: string, price: number, stock: number, category_id: number}}) => {
    try {
        const create = await ApiManager(`/product`, {
            method: 'POST',
            data: data
        })

        return create.data
    } catch (error) {
        throw error
    }
}

export const UpdateProduct = async ({data, id}: {data: {title: string, image: string, price: number, stock: number, category_id: number}, id: number}) => {
    try {
        const fetch = await ApiManager(`/product/${id}`, {
            method: 'PATCH',
            data: data
        })

        return fetch.data
    } catch (error) {
        throw error
    }
}