
import { useAuth } from '@/context/authContext';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRouteUsers = () => {
    const { user } = useAuth();

    return user && <Navigate to="/" />;
};

export default PrivateRouteUsers;