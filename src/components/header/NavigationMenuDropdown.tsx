
import { useAuth } from "@/context/authContext";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, } from "@/ui/navigation-menu"
import { isUserDefined } from "@/utils/typeGuards";
import { Link } from "react-router-dom";


const NavigationMenuDropdown = () => {
    const { user } = useAuth()
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-slate-800">{isUserDefined(user) && user.displayName}</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-slate-800 text-[#F0DC91] rounded-b-sm">
                        <ul className="flex flex-col justify-center p-4 gap-2">
                            <li>
                                <Link to='/profile'>Профил</Link>
                            </li>
                            <li>
                                <Link to='/myads'>Обяви</Link>
                            </li>
                            <li>
                                <Link to='/messages'>Съобщения</Link>
                            </li>
                            <li>
                                <Link to='/logout'>Изход</Link>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavigationMenuDropdown