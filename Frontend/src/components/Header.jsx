import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import '../css/Header.css';
import Swal from 'sweetalert2';

export const Header = () => {
	const [expand, setExpand] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [logoSrc, setLogoSrc] = useState('/logo 2.png');
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const user = currentUser ? currentUser.email : null;
	const admin = currentUser ? currentUser.admin : null;
	const coadmin = currentUser ? currentUser.coadmin : null;

	const handleNavCollapseToggle = () => {
		setExpand(true);
	};

	const handleNavCollapse = () => {
		setExpand(false);
	};

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

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScrolled(true);
				setLogoSrc('/logo 1.png');
			} else {
				setScrolled(false);
				setLogoSrc('/logo 2.png');
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	const navbarClassName = scrolled
		? 'w-full bg-white sticky-top navbar'
		: 'w-full bg-transparent sticky-top navbar text-white';
	const textClassName = scrolled
		? 'text-background hover:decoration-background text-wrap hover:underline hover:decoration-2 lg:text-center  hover:underline-offset-8 p-3'
		: 'text-background lg:text-white hover:decoration-background lg:hover:decoration-white text-wrap hover:underline hover:decoration-2 lg:text-center  hover:underline-offset-8 p-3';
	const loginbtnClassName = scrolled
		? 'm-3 lg:m-0 btnlogin md:mb-2 lg:mb-0 w-[152px] bg-transparent border-2 border-[#185574] p-2 lg:mr-3 rounded-lg text-background'
		: 'm-3 lg:m-0 btnlogin md:mb-2 lg:mb-0 w-[152px] bg-transparent border-2 border-[#185574] p-2 lg:mr-3 rounded-lg ';
	const toggleClassName = scrolled ? 'bg-background' : '';

	return (
		<>
			<Navbar
				data-bs-theme='dark'
				expand='lg'
				id='navbar'
				className={navbarClassName}>
				<Container className='flex flex-row justify-between'>
					<Navbar.Brand href='/'>
						<img
							className='ms-3'
							src={logoSrc}
							width={60}
							alt='logoestudio'
						/>
					</Navbar.Brand>

					<Navbar.Toggle
						aria-controls={`offcanvasNavbar-expand-lg`}
						onClick={handleNavCollapseToggle}
						className={toggleClassName}
					/>
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-lg`}
						show={expand}
						onHide={() => setExpand(false)}
						aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
						placement='end'>
						<Offcanvas.Header closeButton></Offcanvas.Header>
						<Offcanvas.Body className='flex flex-row justify-start lg:justify-end items-start'>
							<Nav className='flex flex-col flex-wrap items-start lg:items-center justify-center'>
																<Link
									className={textClassName}
									to='/contact'
									onClick={handleNavCollapse}>
									<i className='pr-2 text-xl text-[#185574] lg:hidden bi bi-chat-square-text-fill'></i>
									Contacto
								</Link>

								{user ? (
									<Link
										className={textClassName}
										to='/adminusu'
										onClick={handleNavCollapse}>
										<i className='pr-2 text-xl text-[#185574] lg:hidden bi bi-person-fill-check'></i>
										Panel de Usuarios
									</Link>
								) : null}
								{admin || coadmin ? (
									<Link
										className={textClassName}
										to='/admin'
										onClick={handleNavCollapse}>
										<i className='pr-2 text-xl text-[#185574] lg:hidden bi bi-person-fill-gear'></i>
										Panel de Administracion
									</Link>
								) : null}
								<div className='flex flex-wrap items-center justify-center'>
									{user ? (
										<button
											onClick={() => {
												handleNavCollapse();
												handleLogOut();
											}}
											className='mx-3 lg:m-0 btnlogin md:mb-2 lg:mb-0 w-[162px] bg-transparent border-2 border-white p-2 lg:mr-3 rounded-lg'>
											<i className='pr-2 text-xl bi bi-box-arrow-left'></i>
											Cerrar Sesión
										</button>
									) : (
										<Link
											to='/login'
											onClick={handleNavCollapse}
											className={loginbtnClassName}>
											<i className='pr-2 text-xl bi bi-box-arrow-in-right'></i>
											Iniciar Sesión
										</Link>
									)}
								</div>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
};
