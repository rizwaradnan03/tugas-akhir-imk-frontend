import { ApiManager } from "@/lib/api-manager"

export const CreateCheckout = async ({email, product_id, alamat}: {email: string, product_id: number, alamat: string}) => {
    try {
        const fetch = await ApiManager(`/midtrans/checkout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                email: email,
                product_id: product_id,
                alamat: alamat
            }
        });
        
        return fetch.data
    } catch (error) {
        throw error
    }
}