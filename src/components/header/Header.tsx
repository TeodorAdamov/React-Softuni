import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useAuth } from '@/context/authContext'
import NavigationMenuDropdown from './NavigationMenuDropdown'

const Header = () => {
    const { user } = useAuth()
    return (
        <header className='py-2 px-4 flex justify-around bg-slate-800'>
            <div className='w-24'>
                <Link to='/'>
                    <img src={logo} alt="" />
                </Link>
            </div>
            <nav className='flex justify-center items-center'>
                <ul className='flex gap-7 text-[#F0DC91] items-center'>
                    <li>
                        <Link to='/products'>Всички обяви</Link>
                    </li>

                    {user?.email ? (
                        <>
                            <li>
                                <Link to='/sell'>Добави обява</Link>
                            </li>
                            <li>
                                <NavigationMenuDropdown />
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/register'>Регистрация</Link>
                            </li>
                            <li>
                                <Link to='/login'>Вход</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header 