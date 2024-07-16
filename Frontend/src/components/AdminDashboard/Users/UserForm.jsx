/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext.jsx';
import { useUserActions } from '../../../hooks/useUserActions.jsx';
import GenericForm from '../../../helpers/GenericForm';
import FormField from '../../../helpers/FormField';
import Loader from '../../../helpers/Loader.jsx';

const UserForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state, loading } = useContext(UserContext);
	const { editUserAction, addUserAction } = useUserActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => setShowPassword(!showPassword);

	// FILTRA EL USUARIO SELECCIONADO Y CARGA DATOS
	const loadUser = () => {
		const user = state.users.find((user) => user._id === rowId);
		if (user) {
			setValue('name', user.name);
			setValue('subname', user.subname);
			setValue('tel', user.tel);
			setValue('email', user.email);
			setValue('address', user.address);
			setValue('dni', user.dni);
			setValue('rol', user.rol);
			setValue('status', user.status);
			setValue('password', user.password);
		}
	};

	// CARGA DATOS DE USER
	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadUser();
		}
	}, [rowId, mode]);

	// SUBMIT P PREPARAR DATOS Y ENVIAR A REDUCE Y BACKEND
	const onSubmit = handleSubmit(async (values) => {
		try {
			const userData = {
				name: values.name,
				subname: values.subname,
				email: values.email,
				tel: values.tel,
				address: values.address,
				dni: values.dni,
				rol: values.rol,
				status: values.status,
				password: values.password,
			};
			if (mode === 'edit') {
				// EJECUTE EDIT SEGUN MODE
				await editUserAction(rowId, userData);
			} else {
				// EJECUTE ADD SEGUN MODE
				await addUserAction(userData);
			}
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
				<GenericForm
					loading={loading}
					onSubmit={onSubmit}
					onClose={onClose}
					mode={mode}>
					<FormField
						id='name'
						label='Nombre*'
						register={register('name', {
							required: 'El nombre es requerido',
						})}
						errors={errors.name}
						readOnly={mode === 'view'}
					/>
					{errors.name && (
						<span className='text-red-700 fs-6'>
							{errors.name.message}
						</span>
					)}
					<FormField
						id='subname'
						label='Apellido*'
						register={register('subname', {
							required: 'El apellido es requerido',
						})}
						errors={errors.subname}
						readOnly={mode === 'view'}
					/>
					{errors.subname && (
						<span className='text-red-700 fs-6'>
							{errors.subname.message}
						</span>
					)}
					<FormField
						id='dni'
						label='DNI/CUIL*'
						type='number'
						register={register('dni', {
							required: 'El DNI/CUIL es requerido',
							minLength: {
								value: 8,
								message:
									'El DNI/CUIL debe contener entre 8 y 10 dígitos.',
							},
							maxLength: {
								value: 11,
								message:
									'El DNI/CUIL debe contener entre 8 y 10 dígitos.',
							},
						})}
						errors={errors.dni}
						readOnly={mode === 'view'}
					/>
					{errors.dni && (
						<span className='text-red-700 fs-6'>
							{errors.dni.message}
						</span>
					)}
					<FormField
						id='email'
						label='Email*'
						type='email'
						register={register('email', {
							required: 'El email es requerido',
							unique: 'El email ingresado ya existe',
						})}
						errors={errors.email}
						readOnly={mode === 'view'}
					/>
					{errors.email && (
						<span className='text-red-700 fs-6'>
							{errors.email.message}
						</span>
					)}
					<FormField
						id='tel'
						label='Teléfono*'
						type='number'
						register={register('tel', {
							required: 'El teléfono es requerido',
							minLength: {
								value: 10,
								message: 'El celular debe contener 10 dígitos',
							},
							maxLength: {
								value: 10,
								message: 'El celular debe contener 10 dígitos',
							},
						})}
						errors={errors.tel}
						readOnly={mode === 'view'}
					/>
					{errors.tel && (
						<span className='text-red-700 fs-6'>
							{errors.tel.message}
						</span>
					)}
					<FormField
						id='address'
						label='Dirección*'
						register={register('address', {
							required: 'La dirección es requerida',
						})}
						errors={errors.address}
						readOnly={mode === 'view'}
					/>
					{errors.address && (
						<span className='text-red-700 fs-6'>
							{errors.address.message}
						</span>
					)}
					<FormField
						id='rol'
						label='Rol*'
						as='select'
						register={register('rol', {
							required: 'El rol es requerido',
						})}
						errors={errors.rol}
						readOnly={mode === 'view'}>
						<option value=''>Selecciona el rol o puesto...</option>
						<option value='admin'>Administrador</option>
						<option value='server'>Mozo</option>
						<option value='kitchen'>Cocina</option>
						<option value='bar'>Bar</option>
					</FormField>
					{errors.rol && (
						<span className='text-red-700 fs-6'>
							{errors.rol.message}
						</span>
					)}
					<div className='flex flex-col flex-wrap items center'>
						<div className='flex flex-row items-center w-full rounded-md focus:outline-none'>
							<FormField
								id='password'
								label={mode === 'edit' ? '' : 'Contraseña*'}
								type={showPassword ? 'text' : 'password'}
								register={register('password', {
									required: 'La contraseña es requerida',
									minLength: {
										value: 7,
										message:
											'La contraseña debe contener al menos 7 dígitos',
									},
								})}
								errors={errors.password}
								readOnly={mode === 'view'}
								hidden={mode === 'edit'}
							/>
							<button
								type='button'
								hidden={mode === 'edit'}
								onClick={toggleShowPassword}
								id='vercontrasena'
								className='border-none'>
								<i
									className={`text-xl mt-[30px] p-2 ${
										showPassword
											? 'fa-solid fa-eye-slash'
											: 'fa-solid fa-eye'
									}`}></i>
							</button>{' '}
						</div>
						{errors.password && (
							<span className='text-red-700 fs-6'>
								{errors.password.message}
							</span>
						)}
					</div>
					<p className='text-sm'>(*) Campos obligatorios</p>
				</GenericForm>
			)}
		</>
	);
};

export default UserForm;
