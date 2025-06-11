import { ApiManager } from "@/lib/api-manager"

export const Login = async () => {
    try {
        const login = await ApiManager(`/`)        
    } catch (error) {
        throw error
    }
}