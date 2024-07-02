import { Route, Routes } from "react-router-dom"
import "./global.css"
import Layout from "./components/layouts/Layout"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import { AuthProvider } from "./context/authContext"
import Products from "./components/Products"
import Logout from "./components/Logout"

function App() {


    return (
        <AuthProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path='/products' element={<Products />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </AuthProvider>

    )
}

export default App
