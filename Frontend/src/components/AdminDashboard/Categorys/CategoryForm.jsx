/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { MenuContext } from '../../../context/MenuContext';
import { useForm } from 'react-hook-form';
import GenericForm from '../../../helpers/GenericForm';
import FormField from '../../../helpers/FormField';
import { useCategoryActions } from '../../../hooks/useCategoryActions.js';
import Loader from '../../../helpers/Loader';

const CategoryForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state, loading } = useContext(MenuContext);
	const { editCategoryAction, addCategoryAction } = useCategoryActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// BUSCA EN STATE Y CARGA DATOS DE LA CATEGORIA SELECCIONADA
	const loadCategory = () => {
		const category = state.categorys.find(
			(category) => category._id === rowId
		);
		if (category) {
			setValue('name', category.name);
			setValue('status', category.status);
		}
	};

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadCategory();
		}
	}, [rowId, mode]);

	// PREPARA LOS VALUES P ENVIAR 
	const onSubmit = handleSubmit(async (values) => {
		try {
			const categoryData = {
				name: values.name,
				status: values.status,
			};
			if (mode === 'edit') {
				// SI MODE ES EDIT EJECUTA LA FUNCION P EDITAR CATEGORIA
				await editCategoryAction(rowId, categoryData);
			} else {
				// SINO AGREGA LA CATEGORIA INGRESADA
				await addCategoryAction(categoryData);
			}
			onClose();
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<>
			{state.loading ? (
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
						mode={mode}
						register={register('name', {
							required: 'El nombre es obligatorio',
						})}
						errors={errors.name}
					/>{' '}
					{errors.name && (
						<span className='text-red-700 fs-6'>
							{errors.name.message}
						</span>
					)}
					<FormField
						id='status'
						label='Categoría Activa?'
						type='checkbox'
						mode={mode}
						register={register('status')}
						renderAs='toggle'
					/>
					<p className='text-sm'>(*) Campos obligatorios</p>
				</GenericForm>
			)}
		</>
	);
};

export default CategoryForm;
