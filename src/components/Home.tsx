import { useAuth } from "@/context/authContext"
import { isUserDefined } from "@/utils/typeGuards";
import { Link } from "react-router-dom"

const Home = () => {
    const { user } = useAuth();
    return (

        <div className="flex flex-col max-w-[1100px] p-4 bg-slate-200 rounded-md">
            <h1>Добре дошли в Fishing Club</h1>
            <h4>Вашият онлайн пазар за рибарски такъми</h4>
            <p className="text-2xl pt-2">Fishing Club е мястото, където можете лесно да създавате обяви и да продавате рибарски принадлежности.</p>
            {!isUserDefined(user) &&
                <>
                    <Link to="/register" className="pt-10 text-lg font-bold underline">Започнете сега!</Link>
                    <p className="text-lg">Регистрирайте се и създайте своята първа обява или разгледайте нашите категории, за да намерите необходимото за вашето следващо риболовно приключение. Присъединете се към Fishing Club и нека заедно уловим големите риби!</p>
                </>
            }
        </div>
    )
}

export default Home