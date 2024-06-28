/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../Loader.jsx';
import { MenuContext } from '../../../context/MenuContext.jsx';
import { useMenuActions } from '../../../hooks/useMenuActions.jsx';
// import { Categories } from '../../../utils/Categories.js';

const MenuForm = ({ rowId, onClose, mode = 'edit' }) => {
	const [loading, setLoading] = useState(false);
	const { state } = useContext(MenuContext);
	const { editMenuAction, addMenuAction } = useMenuActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const loadMenu = async () => {
		try {
			setLoading(true);
			const menu = state.menus.find((menu) => menu.id === rowId);
			if (menu) {
				setValue('name', menu.name);
				setValue('description', menu.description);
				setValue('price', menu.price);
				setValue('category', menu.category);
			}
			setLoading(false);
		} catch (error) {
			console.error('Error al cargar los datos del menu', error);
		}
	};

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadMenu();
		}
	}, [rowId, mode]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			const menuData = {
				id: rowId,
				name: values.name,
				description: values.description,
				price: values.price,
				category: values.category,
			};

			if (mode === 'edit') {
				setLoading(true);
				await editMenuAction(menuData);
				setLoading(false);
				onClose();
			} else {
				setLoading(true);
				await addMenuAction(menuData);
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
					<Form.Group controlId='name'>
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
					<Form.Group controlId='description'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Descripcion
						</Form.Label>
						<Form.Control
							type='text'
							{...register('description', {
								required: 'La descripcion es requerida',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.description && (
							<span className='text-warning fs-6'>
								{errors.description.message}
							</span>
						)}
					</Form.Group>

					<Form.Group controlId='price'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Precio
						</Form.Label>
						<Form.Control
							type='text'
							{...register('price', {
								required: 'El precio es requerido',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.price && (
							<span className='text-warning fs-6'>
								{errors.price.message}
							</span>
						)}
					</Form.Group>

					<Form.Group controlId='category'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Categoría
						</Form.Label>
						<Form.Control
							as='select'
							{...register('category', {
								required: 'La categoría es requerida',
							})}
							readOnly={mode === 'view'}>
							{/* <option>Selecciona la categoría</option>
							{Categories.map((category, id) => (
								<option key={id} value={category.name}>
									{category.name}
								</option>
							))} */}
						</Form.Control>
						{errors.category && (
							<span className='text-warning fs-6'>
								{errors.category.message}
							</span>
						)}
					</Form.Group>

					<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
						{mode !== 'view' && (
							<Button
								type='submit'
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3 border-white rounded-xl font-semibold'>
								{mode === 'create'
									? 'Registrar Menú'
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

export default MenuForm;
