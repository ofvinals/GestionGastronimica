/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { MenuContext } from '../../../context/MenuContext.jsx';
import { useForm } from 'react-hook-form';
import GenericForm from '../../../helpers/GenericForm';
import FormField from '../../../helpers/FormField';
import { useCategoryActions } from '../../../hooks/useCategoryActions.jsx';

const CategoryForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state, loading } = useContext(MenuContext);
	const { editCategoryAction, addCategoryAction } = useCategoryActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

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

	const onSubmit = handleSubmit(async (values) => {
		try {
			const categoryData = {
				name: values.name,
				status: values.status,
			};
			if (mode === 'edit') {
				await editCategoryAction(rowId, categoryData);
			} else {
				await addCategoryAction(categoryData);
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
				register={register('name', {
					required: 'El nombre es obligatorio',
				})}
				errors={errors.name}
			/>
			<FormField
				id='status'
				label='Categoría Activa?'
				type='checkbox'
				register={register('status')}
				errors={errors.status}

				renderAs="toggle"
			/>
		</GenericForm>
	);
};

export default CategoryForm;
