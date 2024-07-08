/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import GenericForm from '../../../helpers/GenericForm';
import FormField from '../../../helpers/FormField';
import { MenuContext } from '../../../context/MenuContext.jsx';
import { useMenuActions } from '../../../hooks/useMenuActions.jsx';

const MenuForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state, loading } = useContext(MenuContext);
	const categorys = state.categorys;
	const { dataMenus, editMenuAction, addMenuAction } = useMenuActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const loadMenu = () => {
		const menu = state.menus.find((menu) => menu._id === rowId);
		if (menu) {
			setValue('name', menu.name);
			setValue('category', menu.category);
			setValue('description', menu.description);
			setValue('price', menu.price);
			setValue('status', menu.status);
		}
	};

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			dataMenus();
			loadMenu();
		}
	}, [rowId, mode]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			const menuData = {
				name: values.name,
				category: values.category,
				description: values.description,
				price: values.price,
				status: values.status,
			};
			if (mode === 'edit') {
				await editMenuAction(rowId, menuData);
			} else {
				await addMenuAction(menuData);
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
			/>
			<FormField
				id='category'
				label='Categoría'
				as='select'
				register={register('category', {
					required: 'La categoría es requerida',
				})}
				errors={errors.category}>
				<option>Selecciona la categoría</option>
				{categorys.map((category, id) => (
					<option key={id} value={category.name}>
						{category.name}
					</option>
				))}
			</FormField>
			<FormField
				id='description'
				label='Descripción'
				as='textarea'
				register={register('description', {
					required: 'La descripción es requerida',
				})}
				errors={errors.description}
			/>
			<FormField
				id='price'
				label='Precio'
				type='number'
				register={register('price', { required: 'El precio es requerido' })}
				errors={errors.price}
			/>
			<FormField
				id='status'
				label='Menú Activo?'
				type='checkbox'
				register={register('status')}
				errors={errors.status}
				renderAs={'toggle'}
			/>
		</GenericForm>
	);
};

export default MenuForm;
