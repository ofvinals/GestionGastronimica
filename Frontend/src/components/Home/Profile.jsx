/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import Loader from '../../helpers/Loader.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useUserActions } from '../../hooks/useUserActions.jsx';
import FormField from '../../helpers/FormField';

const Profile = ({  onClose }) => {
	const { state, loading } = useContext(AuthContext);
	const { dataUsers, editUserAction } = useUserActions();
	const [idUser, setIdUser] = useState(null);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm();
	const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
	const [showPasswordNew, setShowPasswordNew] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

	// FILTRA USUARIO Y CARGA DATOS
	const loadUser = async () => {
		try {
			const users = await dataUsers();
			const user = users.find((user) => user._id === state.user.id);
			if (user) {
				setValue('name', user.name);
				setValue('subname', user.subname);
				setValue('tel', user.tel);
				setValue('dni', user.dni);
				setValue('rol', user.rol);
				setValue('status', user.status);
			}
			setIdUser(user._id);
		} catch (error) {
			console.error('Error al cargar los datos del usuario', error);
		}
	};

	// CARGA DATOS DE USUARIOS
	useEffect(() => {
		loadUser();
	}, []);

	// PREPARA DATOS Y ENVIA A REDUCER Y BACKEND P ACTUALIZAR
	const onSubmit = handleSubmit(async (values) => {
		try {
			const userData = {
				name: values.name,
				subname: values.subname,
				tel: values.tel,
				rol: values.rol,
				status: values.status,
				dni: values.dni,
			};
			if (values.password && values.newPassword) {
				userData.password = values.password;
				userData.newPassword = values.newPassword;
			}
			// EJECUTA FUNCION P ACTUALIZAR DATOS
			await editUserAction(idUser, userData);
			// CIERRA MODAL DE EDICION
			onClose();
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={onSubmit}>
					<FormField
						id='name'
						label='Nombre'
						type='text'
						register={register('name', {
							required: {
								value: true,
								message: 'El nombre es requerido',
							},
						})}
						errors={errors.name}
					/>
					<FormField
						id='subname'
						label='Apellido'
						type='text'
						register={register('subname', {
							required: {
								value: true,
								message: 'El apellido es requerido',
							},
						})}
						errors={errors.subname}
					/>
					<FormField
						id='dni'
						label='DNI/CUIL'
						type='number'
						register={register('dni', {
							required: {
								value: true,
								message: 'El DNI/CUIL es requerido',
							},
							minLength: {
								value: 8,
								message:
									'El DNI/CUIL debe contenter entre 8 y 10 dígitos.',
							},
							maxLength: {
								value: 11,
								message:
									'El DNI/CUIL debe contenter entre 8 y 10 dígitos.',
							},
						})}
						errors={errors.dni}
					/>
					<FormField
						id='tel'
						label='Teléfono'
						type='number'
						register={register('tel', {
							required: {
								value: true,
								message: 'El teléfono es requerido',
							},
							minLength: {
								value: 10,
								message: 'El celular debe contenter 10 dígitos',
							},
							maxLength: {
								value: 10,
								message: 'El celular debe contenter 10 dígitos',
							},
						})}
						errors={errors.tel}
					/>
					<Form.Control type='hidden' {...register('status')} />
					<Form.Control type='hidden' {...register('rol')} />
					<FormField
						id='password'
						label='Contraseña actual'
						type={showPasswordCurrent ? 'text' : 'password'}
						register={register('password')}
						errors={errors.password}
						extraProps={{
							togglePasswordVisibility: () =>
								setShowPasswordCurrent(!showPasswordCurrent),
							showPassword: showPasswordCurrent,
						}}
					/>
					<FormField
						id='newPassword'
						label='Nueva contraseña'
						type={showPasswordNew ? 'text' : 'password'}
						register={register('newPassword', {
							minLength: {
								value: 7,
								message:
									'La contraseña debe contener al menos 7 dígitos',
							},
						})}
						errors={errors.newPassword}
						extraProps={{
							togglePasswordVisibility: () =>
								setShowPasswordNew(!showPasswordNew),
							showPassword: showPasswordNew,
						}}
					/>
					<FormField
						id='confirmPassword'
						label='Confirmar nueva contraseña'
						type={showPasswordConfirm ? 'text' : 'password'}
						register={register('confirmPassword', {
							validate: (value) =>
								value === watch('newPassword') ||
								'Las contraseñas no coinciden',
						})}
						errors={errors.confirmPassword}
						extraProps={{
							togglePasswordVisibility: () =>
								setShowPasswordConfirm(!showPasswordConfirm),
							showPassword: showPasswordConfirm,
						}}
					/>
					<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
						<button
							type='submit'
							className='text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'>
							<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
						</button>
						<button
							type='button'
							className='text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'
							onClick={onClose}>
							<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>
						</button>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default Profile;
