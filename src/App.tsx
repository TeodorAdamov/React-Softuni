import { Route, Routes } from "react-router-dom"
import "./global.css"
import Layout from "./components/layouts/Layout"
import Home from "./components/Home"
import Register from "./components/register"

function App() {


    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    )
}

export default App
