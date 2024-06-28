// LoginForm.js
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const user = [
	{
		id: 0,
		name: 'Server',
		password: '123',
		rol: 'server',
	},
	{
		id: 1,
		name: 'Admin',
		password: '123',
		rol: 'admin',
	},
	{
		id: 2,
		name: 'Kitchen',
		password: '123',
		rol: 'kitchen',
	},
];
export const LoginForm = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			// const user = await login(formData);
			setLoading(false);
			Swal.fire({
				icon: 'success',
				title: 'Inicio de sesión exitoso!',
				showConfirmButton: false,
				timer: 2000,
			});
			if (user && user.rol === 'admin') {
				navigate('/admin');
			} else if (user && user.rol === 'kitchen') {
				navigate('/kitchen');
			} else if (user && user.rol === 'server') {
				navigate('/server');
			}
			navigate('/admin');
		} catch (error) {
			console.error(error);
			setLoading(false);
			Swal.fire({
				icon: 'error',
				title: 'Ingreso rechazado',
				text: 'El usuario y/o contraseña no son correctos!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<section className=' py-10 flex flex-wrap items-center justify-center flex-col pb-10'>
			<Form
				id='loginForm'
				className='mt-10 flex flex-col justify-center items-center w-[280px] border-2 border-black bg-white pb-6 rounded-xl'
				onSubmit={handleSubmit}>
				<h2 className='text-center textshadow text-3xl text-background font-bold m-7'>
					Iniciar Sesion
				</h2>

				{loading ? (
					<Loader />
				) : (
					<>
						<Form.Group
							className='flex flex-col w-full items-center'
							controlId='inputemail'>
							<div className='relative'>
								<select
									className='items-center shadow-2xl w-[250px] pl-7 rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}>
									<option>Selecciona tu usuario</option>
									{user.map((user, id) => (
										<option key={id} value={user.name}>
											{user.name}
										</option>
									))}
								</select>
								<i className='fa-solid fa-user absolute left-2 top-1/2 transform -translate-y-1/2 text-black'></i>
							</div>
						</Form.Group>

						<Form.Group
							className='flex flex-col w-full items-center mt-3'
							controlId='inputpassword'>
							<div className='flex flex-row shadow-2xl w-[250px] justify-center bg-white rounded-lg border-2 border-black'>
								<div className='relative'>
									<input
										className='items-center text-black w-11/12 p-2 rounded-md pl-7 focus:outline-none'
										type={showPassword ? 'text' : 'password'}
										name='password'
										value={formData.password}
										onChange={handleInputChange}
										placeholder='Contraseña'
									/>
									<i className='fa-solid fa-key absolute left-2 top-1/2 transform -translate-y-1/2 text-black'></i>
								</div>
								<Button
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
								</Button>
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
