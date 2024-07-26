import { Route, Routes } from "react-router-dom"
import "./global.css"
import Layout from "./components/layouts/Layout"
import Home from "./components/Home"
import Register from "./components/auth/Register"
import Login from "./components//auth/Login"
import { AuthProvider } from "./context/authContext"
import Products from "./components/products/Products"
import Logout from "./components/auth/Logout"
import SellForm from "./components/createForm/SellForm"
import ProductDetails from "./components/products/productDetails/ProductDetails"
import MyAds from "./components/currentUser/MyAds"
import MyMessages from "./components/currentUser/MyMessages"

function App() {


    return (
        <AuthProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/products/:id' element={<ProductDetails />} />
                    <Route path='/myads' element={<MyAds />} />
                    <Route path='/messages' element={<MyMessages />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/sell" element={<SellForm />}></Route>
                </Route>
            </Routes>
        </AuthProvider>

    )
}

export default App
