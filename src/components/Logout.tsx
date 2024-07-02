import { useAuth } from "@/context/authContext"

const Logout = () => {
    const { logout } = useAuth()
    logout()
}

export default Logout