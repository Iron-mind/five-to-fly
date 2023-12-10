import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/ContextUser';
import { useContext } from 'react';

export const PrivateRoute = ({ children }) => {
	const { user } = useContext(AuthContext);
	return user ? children : <Navigate to='/login' />;
};
