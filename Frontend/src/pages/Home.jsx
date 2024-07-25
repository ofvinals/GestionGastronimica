/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { LoginForm } from '../components/Home/LoginForm';
import { useUserActions } from '../hooks/useUserActions';
import Loader from '../helpers/Loader';
import { UserContext } from '../context/UserContext';

export const Home = () => {
	const { dataUsers } = useUserActions();
	const { state: userState } = useContext(UserContext);

	useEffect(() => {
		dataUsers();
	}, []);

	if (userState.loading) {
		return <Loader />;
	}

	return (
		<div className=''>
			<div className='relative w-full '>
				<img
					src='/LOGO RESTOFLOW.png'
					alt='logo marca'
					className='h-[70vh]  opacity-50 w-full'
				/>
				<div className='absolute inset-0 items-center justify-center flex flex-col'>
					<h1 className='text-[46px] font-bold text-center  text-black'>
						Bienvenido a RestóFLOW
					</h1>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};
