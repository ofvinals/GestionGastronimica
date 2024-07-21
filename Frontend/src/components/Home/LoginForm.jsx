/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../helpers/Loader';
import { UserContext } from '../../context/UserContext';
import { useUserActions } from '../../hooks/useUserActions.js';
import { useAuthActions } from '../../hooks/useAuthActions.js';

export const LoginForm = () => {
	const navigate = useNavigate();
	const { login } = useAuthActions();
	const { state: userState, loading } = useContext(UserContext);
	const { dataUsers } = useUserActions();

	const users = userState.users;
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		dataUsers();
	}, []);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = await login(formData);
			if (user && user.rol === 'admin') {
				navigate('/admin');
			} else if (user && user.rol === 'kitchen') {
				navigate('/kitchen');
			} else if (user && user.rol === 'server') {
				navigate('/server');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className='flex flex-wrap items-center justify-center flex-col pb-10'>
			<Form
				id='loginForm'
				className='mt-1 flex flex-col justify-center items-center w-[300px] border-2 border-white bg-slate-700 pb-6 rounded-xl'
				onSubmit={handleSubmit}>
				<h2 className='text-center textshadow text-3xl text-white font-bold m-7'>
					Iniciar Sesion
				</h2>

				{loading ? (
					<Loader />
				) : (
					<>
						<Form.Group
							className='flex flex-col w-full px-3 items-center'
							controlId='inputemail'>
							<div className='relative'>
								<select
									className='items-center shadow-2xl w-full  rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}>
									<option>Selecciona tu usuario</option>
									{users
										? users
												.filter((user) => user.status === true)
												.map((user, id) => (
													<option key={id} value={user.email}>
														{user.name} {user.subname}
													</option>
												))
										: null}
								</select>
							</div>
						</Form.Group>

						<Form.Group
							className='flex flex-col w-full items-center px-3 mt-3'
							controlId='inputpassword'>
							<div className='flex flex-row shadow-2xl  w-full justify-between bg-white rounded-lg border-2 border-black'>
								<div className='relative'>
									<input
										className='items-center text-black w-full p-2 rounded-md pl-7 focus:outline-none'
										type={showPassword ? 'text' : 'password'}
										name='password'
										value={formData.password}
										onChange={handleInputChange}
										placeholder='Contraseña'
									/>
								</div>
								<button
									type='button'
									onClick={toggleShowPassword}
									id='viewpass'
									className='border-none'>
									<i
										className={`text-xl p-2 ${
											showPassword
												? 'fa-solid fa-eye-slash'
												: 'fa-solid fa-eye'
										}`}></i>
								</button>
							</div>
						</Form.Group>

						<Form.Group
							className='flex flex-col items-center'
							controlId='inputpassword'>
							<Button
								className='m-3 w-[142px] bg-white border-2 shadow-3xl border-background text-background p-2 rounded-2xl font-semibold'
								type='submit'>
								<i className='text-xl pe-2 fa-solid fa-right-to-bracket'></i>
								Iniciar
							</Button>
						</Form.Group>
					</>
				)}
			</Form>
		</section>
	);
};

export default LoginForm;
