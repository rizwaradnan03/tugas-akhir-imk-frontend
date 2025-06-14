import { ApiManager } from "@/lib/api-manager"

export const Login = async ({data}: {data: {email: string, password: string}}) => {
    try {
        const login = await ApiManager(`/login`, {
            method: 'POST',
            data: data
        })

        return login.data
    } catch (error) {
        throw error
    }
}