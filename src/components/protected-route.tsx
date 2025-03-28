import { UseLocalStorageGetItem } from "@/lib/local-storage";
import { UseGetCurrentUrl } from "@/lib/url";
import { TReactNode } from "@/types/htmlType";
// import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: TReactNode }) => {
    const currentUrl = UseGetCurrentUrl()
    const accessToken = UseLocalStorageGetItem({ key: "accessToken" })

    let redirectUrl = ""
    if (!accessToken) {
        // toast.error("Anda Harus Login Terlebih Dahulu!")

        if (currentUrl.startsWith("/teacher")) {
            redirectUrl = "/auth/sign-in/teacher"
            console.log("mau ke teacher")
        } else if (currentUrl.startsWith("/student")) {
            redirectUrl = "/auth/sign-in/student"
            console.log("mau ke setudent")
        }
    }

    return accessToken ? children : <Navigate to={redirectUrl} />
}

export default ProtectedRoute