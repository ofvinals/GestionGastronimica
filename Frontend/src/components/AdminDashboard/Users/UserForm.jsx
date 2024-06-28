/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../Loader.jsx';
import { UserContext } from '../../../context/UserContext.jsx';
import { useUserActions } from '../../../hooks/useUserActions.jsx';

const UserForm = ({ rowId, onClose, mode = 'edit' }) => {
	const [loading, setLoading] = useState(false);
	const { state } = useContext(UserContext);
	const { editUserAction, addUserAction } = useUserActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const loadUser = async () => {
		try {
			setLoading(true);
			const user = state.users.find((user) => user.id === rowId);
			if (user) {
				setValue('name', user.name);
				setValue('subname', user.subname);
				setValue('tel', user.tel);
				setValue('rol', user.rol);
				setValue('status', user.status);
			}
			setLoading(false);
		} catch (error) {
			console.error('Error al cargar los datos del usuario', error);
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
				id: rowId,
				name: values.name,
				subname: values.subname,
				tel: values.tel,
				rol: values.rol,
				status: values.status,

			};

			if (mode === 'edit') {
				setLoading(true);
				await editUserAction(userData);
				setLoading(false);
				onClose();
			} else {
				setLoading(true);
				await addUserAction(userData);
				setLoading(false);
				onClose();
			}
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
					<Form.Group controlId='fecha'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Nombre
						</Form.Label>
						<Form.Control
							type='text'
							{...register('name', {
								required: 'El nombre es requerido',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.name && (
							<span className='text-warning fs-6'>
								{errors.name.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='concepto'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Apellido
						</Form.Label>
						<Form.Control
							type='text'
							{...register('subname', {
								required: 'El apellido es requerido',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.subname && (
							<span className='text-warning fs-6'>
								{errors.subname.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='tipo'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Telefono
						</Form.Label>
						<Form.Control
							type='number'
							{...register('tel', {
								required: 'El telefono es requerido',
							})}
							readOnly={mode === 'view'}></Form.Control>
						{errors.tel && (
							<span className='text-warning fs-6'>
								{errors.tel.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='monto'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Rol
						</Form.Label>
						<Form.Control
							as='select'
							{...register('rol', {
								required: 'El rol es requerido',
							})}
							readOnly={mode === 'view'}>
							<option value=''>Selecciona..</option>
							<option value='admin'>Administrador</option>
							<option value='server'>Mozo</option>
							<option value='kitchen'>Cocina</option>
							<option value='bar'>Bar</option>
						</Form.Control>
					</Form.Group>

					<label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
						Usuario Activo?
						<input
							className={`ml-2 mt-2 h-6 w-6 text-red-600 focus:ring-red-500 border-gray-300 rounded ${
								mode === 'view' ? 'cursor-not-allowed opacity-50' : ''
							}`}
							type='checkbox'
							value='status'
							{...register('status')}
							disabled={mode === 'view'}
						/>
					</label>

					<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
						{mode !== 'view' && (
							<Button
								type='submit'
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'>
								{mode === 'create'
									? 'Registrar Usuario'
									: 'Guardar Cambios'}
							</Button>
						)}
						<Button
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'
							onClick={onClose}>
							{mode === 'view' ? 'Volver' : 'Cancelar'}
						</Button>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default UserForm;
