/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import GenericForm from '../../../helpers/GenericForm';
import FormField from '../../../helpers/FormField';
import { MenuContext } from '../../../context/MenuContext';
import { useMenuActions } from '../../../hooks/useMenuActions.js';
import Loader from '../../../helpers/Loader';

const MenuForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state, loading } = useContext(MenuContext);
	const categorys = state.categorys;
	const { editMenuAction, addMenuAction } = useMenuActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// ESTADO PARA MANEJAR LOS INGREDIENTES
	const [ingredients, setIngredients] = useState([]);
	const [newIngredient, setNewIngredient] = useState('');

	// CARGA DATOS DE LOS MENUS GUARDADOS EN BACKEND
	const loadMenu = () => {
		const menu = state.menus.find((menu) => menu._id === rowId);
		if (menu) {
			setValue('name', menu.name);
			setValue('category', menu.category);
			setValue('description', menu.description);
			setValue('price', menu.price);
			setValue('status', menu.status);
			setIngredients(menu.ingredients || []);
		}
	};

	// RECARGA DATOS DEL MENU SI EL MODE ES EDIT O VIEW
	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadMenu();
		}
	}, [rowId, mode]);

	// FUNCION PARA AGREGAR NUEVOS INGREDIENTES Y CARGA COMO ARRAY EN SETINGREDIENTS
	const handleAddIngredient = () => {
		if (newIngredient.trim()) {
			setIngredients([...ingredients, { name: newIngredient.trim() }]);
			setNewIngredient('');
		}
	};

	// FUNCION PARA CAMBIAR LOS VALORES DEL INGREDIENTE
	const handleIngredientChange = (index, value) => {
		const newIngredients = [...ingredients];
		newIngredients[index].name = value;
		setIngredients(newIngredients);
	};

	//  FUNCION PARA BORRAR LOS INGREDIENTES DEL ESTADO INGREDIENTS
	const handleRemoveIngredient = (index) => {
		setIngredients(ingredients.filter((_, i) => i !== index));
	};

	// SUBMIT P ENVIAR DATOS DEL FORMULARIO A REDUCER Y BACKEND
	const onSubmit = handleSubmit(async (values) => {
		try {
			const menuData = {
				name: values.name,
				category: values.category,
				description: values.description,
				price: values.price,
				status: values.status,
				ingredients,
			};
			if (mode === 'edit') {
				// EJEFCUTA FUNCION EDIT SEGUN EL MODE
				await editMenuAction(rowId, menuData);
			} else {
				// EJECUTA FUNCION ADD SEGUN EL MODE
				await addMenuAction(menuData);
			}
			// CIERRA MODALES
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
						mode={mode}
						register={register('name', {
							required: 'El nombre es requerido',
						})}
						errors={errors.name}
					/>{' '}
					{errors.name && (
						<span className='text-red-700 fs-6'>
							{errors.name.message}
						</span>
					)}
					<FormField
						id='category'
						label='Categoría*'
						as='select'
						mode={mode}
						register={register('category', {
							required: 'La categoría es requerida',
						})}
						errors={errors.category}>
						{categorys.map((category, id) => (
							<option key={id} value={category.name}>
								{category.name}
							</option>
						))}
					</FormField>{' '}
					{errors.category && (
						<span className='text-red-700 fs-6'>
							{errors.category.message}
						</span>
					)}
					<FormField
						id='description'
						label='Descripción*'
						as='textarea'
						mode={mode}
						register={register('description', {
							required: 'La descripción es requerida',
						})}
						errors={errors.description}
					/>{' '}
					{errors.description && (
						<span className='text-red-700 fs-6'>
							{errors.description.message}
						</span>
					)}
					<FormField
						id='price'
						label='Precio*'
						type='number'
						mode={mode}
						register={register('price', {
							required: 'El precio es requerido',
						})}
						errors={errors.price}
					/>{' '}
					{errors.price && (
						<span className='text-red-700 fs-6'>
							{errors.price.message}
						</span>
					)}
					<FormField
						id='status'
						label='Menú Activo?'
						type='checkbox'
						mode={mode}
						register={register('status')}
						renderAs={'toggle'}
					/>
					{/* Campo para agregar ingredientes */}
					<div className='ingredient-field'>
						<label className='text-start bg-transparent text-xl mb-0 mt-2 text-background font-medium'>
							Ingredientes
						</label>
						<ul className='ingredient-list'>
							{ingredients.map((ingredient, index) => (
								<li key={index} className='ml-5 list-disc'>
									<input
										type='text'
										value={ingredient.name}
										mode={mode}
										onChange={(e) =>
											handleIngredientChange(index, e.target.value)
										}
										placeholder='Nombre del ingrediente'
									/>
									<button
										type='button'
										onClick={() => handleRemoveIngredient(index)}>
										<i className='fa-solid fa-ban text-xl bg-red-100 text-red-800 mx-2 border-2 hover:text-red-100 hover:border-red-800 hover:bg-red-800 rounded-full'></i>
									</button>
								</li>
							))}
						</ul>
						<div className='flex flex-row flex-wrap items-center '>
							<FormField
								type='text'
								mode={mode}
								value={newIngredient}
								onChange={(e) => setNewIngredient(e.target.value)}
								placeholder='Agregar ingrediente'
							/>
							<button type='button' onClick={handleAddIngredient}>
								<i className='mx-4 mt-4 fa-solid fa-circle-plus text-2xl text-green-800 hover:text-green-100 border-2 hover:border-green-800 rounded-full hover:bg-green-800'></i>
							</button>
						</div>
					</div>
					<FormField
						id='recipe'
						mode={mode}
						label='Receta'
						type='textarea'
						register={register('recipe')}
						as='textarea'
					/>
					<p className='text-sm'>(*) Campos obligatorios</p>
				</GenericForm>
			)}
		</>
	);
};

export default MenuForm;
