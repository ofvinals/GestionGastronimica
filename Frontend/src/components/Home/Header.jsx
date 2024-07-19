import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { DateTime } from './Date';
import { useAuthActions } from '../../hooks/useAuthActions.js';
import UserMenu from './UserMenu';
import Loader from '../../helpers/Loader';

export const Header = () => {
	const [scrolled, setScrolled] = useState(false);
	const { state, loading } = useContext(AuthContext);
	const { logout } = useAuthActions();
	const navigate = useNavigate();
	const { displayName } = state.user ? state.user : 'No hay usuario logueado';

	const handleLogOut = async () => {
		await logout();
		Swal.fire({
			icon: 'success',
			title: 'Su sesion fue cerrada!',
			showConfirmButton: false,
			timer: 1500,
		});
		navigate('/home');
	};

	useEffect(() => {}, [state]);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		if (window.scrollY > 0) {
	// 			setScrolled(true);
	// 			setLogoSrc('/logo 1.png');
	// 		} else {
	// 			setScrolled(false);
	// 			setLogoSrc('/logo 2.png');
	// 		}
	// 	};

	// 	window.addEventListener('scroll', handleScroll);
	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// }, []);
	const navbarClassName = scrolled
		? 'w-full bg-white sticky-top navbar rounded-b-3xl'
		: 'w-full bg-slate-700 sticky-top navbar text-white rounded-b-3xl ';

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Navbar
					data-bs-theme='dark'
					id='navbar'
					className={navbarClassName}>
					<Container className='flex w-full flex-row justify-between bg-slate-700'>
						<Navbar.Brand href='/'>
							<img
								className='ms-3 rounded-lg'
								src='/LOGO RESTOFLOW.png'
								width={60}
								alt='logomarca'
							/>
						</Navbar.Brand>

						<Nav className='flex w-full flex-row flex-wrap items-center justify-around'>
							<div className='flex flex-row flex-wrap items-center justify-center'>
								{displayName ? (
									<>
										<UserMenu
											displayName={displayName}
											handleLogOut={handleLogOut}
										/>
									</>
								) : null}
							</div>
							<div className='flex flex-col flex-wrap items-center'>
								<DateTime />
							</div>
						</Nav>
					</Container>
				</Navbar>
			)}
		</>
	);
};
