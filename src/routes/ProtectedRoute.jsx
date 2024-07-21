import { useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthContext';

import { useNavigate } from 'react-router-dom';
import App from '../assets/js/app';

function ProtectedRoute({ element, isAdmin }) {
    const { user, loading } = useAuth();
    const navigate          = useNavigate();

    useEffect(() => {
        if(!loading){
            if (!user) {
                App.showAlert(false, "You need to Login");
                navigate('/login');
                return;
            }
            else if (user && isAdmin && user.role!=="admin"){
                navigate('/');
                return;
            }
        }
    }, [user, navigate, loading, isAdmin]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return element;
}

export default ProtectedRoute;