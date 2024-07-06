/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext.jsx';
import { useUserActions } from '../../../hooks/useUserActions.jsx';
import GenericForm from '../../../helpers/GenericForm';
import FormField from '../../../helpers/FormField';

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

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadUser();
		}
	}, [rowId, mode]);

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
				await editUserAction(rowId, userData);
			} else {
				await addUserAction(userData);
			}
			onClose();
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<GenericForm
			loading={loading}
			onSubmit={onSubmit}
			onClose={onClose}
			mode={mode}>
			<FormField
				id='name'
				label='Nombre'
				register={register('name', { required: 'El nombre es requerido' })}
				errors={errors.name}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='subname'
				label='Apellido'
				register={register('subname', {
					required: 'El apellido es requerido',
				})}
				errors={errors.subname}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='dni'
				label='DNI/CUIL'
				type='number'
				register={register('dni', {
					required: 'El DNI/CUIL es requerido',
					minLength: {
						value: 8,
						message: 'El DNI/CUIL debe contener entre 8 y 10 dígitos.',
					},
					maxLength: {
						value: 11,
						message: 'El DNI/CUIL debe contener entre 8 y 10 dígitos.',
					},
				})}
				errors={errors.dni}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='email'
				label='Email'
				type='email'
				register={register('email', {
					required: 'El Email es requerido',
				})}
				errors={errors.email}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='tel'
				label='Teléfono'
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
			<FormField
				id='address'
				label='Dirección'
				register={register('address', {
					required: 'La dirección es requerida',
				})}
				errors={errors.address}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='rol'
				label='Rol'
				as='select'
				register={register('rol', { required: 'El rol es requerido' })}
				errors={errors.rol}
				readOnly={mode === 'view'}>
				<option value=''>Selecciona el rol o puesto...</option>
				<option value='admin'>Administrador</option>
				<option value='server'>Mozo</option>
				<option value='kitchen'>Cocina</option>
				<option value='bar'>Bar</option>
			</FormField>
			<div className='flex flex-row items-center w-full rounded-md focus:outline-none'>
				<FormField
					id='password'
					label={mode === 'edit' ? '' : 'Contraseña'}
					type={showPassword ? 'text' : 'password'}
					register={register('password', {
						required: 'La contraseña es requerida',
						minLength: {
							value: 7,
							message: 'La contraseña debe contener al menos 7 dígitos',
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
							showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
						}`}></i>
				</button>{' '}
			</div>
		</GenericForm>
	);
};

export default UserForm;
