import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../src/context/AuthContext';
import Loader from '../src/helpers/Loader';
import { useContext } from 'react';

const PrivateRoute = () => {
	const { state } = useContext(AuthContext);
	console.log(state.user)

	if (state.loading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}
	console.log(state.user)
	if (!state.user) return <Navigate to='/home' />;

	return <Outlet />;
};

export default PrivateRoute;
