/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../Loader.jsx';
import { useCategoryActions } from '../../../hooks/useCategoryActions.jsx';

const CategoryForm = ({ rowId, onClose, mode = 'edit' }) => {
	const [loading, setLoading] = useState(false);
	const { state, editCategoryAction, addCategoryAction } =
		useCategoryActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const loadCategory = async () => {
		try {
			setLoading(true);
			const category = state.categorys.find(
				(category) => category.id === rowId
			);
			if (category) {
				setValue('name', category.name);
			}
			setLoading(false);
		} catch (error) {
			console.error('Error al cargar los datos de la categoria', error);
		}
	};

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadCategory();
		}
	}, [rowId, mode]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			const categoryData = {
				id: rowId,
				name: values.name,
				status: values.status,
			};

			if (mode === 'edit') {
				setLoading(true);
				await editCategoryAction(categoryData);
				setLoading(false);
				onClose();
			} else {
				setLoading(true);
				await addCategoryAction(categoryData);
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
					<label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
						Categoria Activa?
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
									? 'Registrar Categoria'
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

export default CategoryForm;
