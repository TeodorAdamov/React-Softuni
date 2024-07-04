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
                        <Link to='/products'>Products</Link>
                    </li>

                    {user?.email ? (
                        <>
                            <li>
                                <Link to='/sell'>Sell product</Link>
                            </li>
                            <li>
                                <NavigationMenuDropdown username={user.displayName} />
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header 