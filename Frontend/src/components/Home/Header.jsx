import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../../context/AuthContext';
import { DateTime } from './Date';
import { useAuthActions } from '../../hooks/useAuthActions.js';
import UserMenu from './UserMenu';

export const Header = () => {
	const [scrolled] = useState(false);
	const { state } = useContext(AuthContext);
	const { logout } = useAuthActions();
	const { displayName } = state.user ? state.user : 'No hay usuario logueado';

	const handleLogOut = async () => {
		await logout();
	};

	useEffect(() => {}, [state]);

	const navbarClassName = scrolled
		? 'w-full bg-white sticky-top navbar rounded-b-3xl'
		: 'w-full bg-slate-700 sticky-top navbar text-white rounded-b-3xl ';

	return (
		<>

				<Navbar
					data-bs-theme='dark'
					id='navbar'
					className={navbarClassName}>
					<Container className='flex w-full flex-row justify-between bg-slate-700'>
						<Navbar.Brand href='/'>
							<img
								className='ms-3 rounded-lg'
								src='/LOGO RESTOFLOW.png'
								width={100}
								alt='logomarca'
							/>
						</Navbar.Brand>

						<Nav className='flex w-full flex-row flex-wrap items-center justify-around'>
							{displayName ? (
								<>
									<UserMenu
										displayName={displayName}
										handleLogOut={handleLogOut}
									/>
								</>
							) : null}
						</Nav>
						<div className='flex felx-col text-center flex-wrap items-center'>
							<DateTime />
						</div>
					</Container>
				</Navbar>
			
		</>
	);
};
