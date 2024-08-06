
import { useAuth } from '@/context/authContext';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRouteGuests = () => {
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteGuests;