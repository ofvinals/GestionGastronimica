import { useReducer } from 'react';
import Swal from 'sweetalert2';
import { CategoryReducer } from '../reducer/CetegoryReducer';

const initialState = {
	categorys: [],
	loading: false,
	error: null,
};

export const useCategoryActions = () => {
	const [state, dispatch] = useReducer(CategoryReducer, initialState);

	const dataCategorys = async () => {
		dispatch({ type: 'DATA_CATEGORYS_REQUEST' });
		try {
			// const users = await getUsers();
			const categorys = [
				{
					id: 0,
					name: 'Entradas',
				},
				{
					id: 1,
					name: 'Carnes',
				},
				{
					id: 2,
					name: 'Pastas',
				},
				{
					id: 3,
					name: 'Guarniciones',
				},
				{
					id: 4,
					name: 'Postres',
				},
				{
					id: 5,
					name: 'Vinos',
				},
				{
					id: 6,
					name: 'Cocktails',
				},
				{
					id: 7,
					name: 'Desayunos',
				},
				{
					id: 8,
					name: 'Happy Hours',
				},
			];
			dispatch({ type: 'DATA_CATEGORYS', payload: categorys });
		} catch (error) {
			console.error('Error al buscar la categoria:', error);
		}
	};

	const addCategoryAction = async (category) => {
		try {
			// const addUser = await addUser(user);
			dispatch({ type: 'ADD_CATEGORY', payload: category });
			Swal.fire({
				icon: 'success',
				title: 'Categoria registrada correctamente',
				showConfirmButton: false,
				timer: 2500,
			});
		} catch (error) {
			console.error('Error al registra la categoria:', error);
		}
	};

	const disableCategoryAction = async (id) => {
		const result = await Swal.fire({
			title: 'Confirmas la inhabilitacion de la categoria?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#8f8e8b',
			confirmButtonText: 'Sí, confirmar',
			cancelButtonText: 'Cancelar',
		});
		if (result.isConfirmed) {
			try {
				// const updatedProduct = await disableProduct(id);

				dispatch({ type: 'DISABLE_CATEGORY', payload: id });
				Swal.fire({
					icon: 'success',
					title: 'Categoria inhabilitada correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
			} catch (error) {
				console.error('Error al suspender la categoria:', error);
			}
		}
	};

	const enableCategoryAction = async (id) => {
		const result = await Swal.fire({
			title: 'Confirmas la habilitacion de la categoria?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#085718',
			cancelButtonColor: '#8f8e8b',
			confirmButtonText: 'Sí, confirmar',
			cancelButtonText: 'Cancelar',
		});
		if (result.isConfirmed) {
			try {
				// const updatedUser = await enableUser(id);
				dispatch({ type: 'ENABLE_CATEGORY', payload: id });
				Swal.fire({
					icon: 'success',
					title: 'Categoria habilitada correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
			} catch (error) {
				console.error('Error al habilitar la categoria:', error);
			}
		}
	};

	const editCategoryAction = async (category) => {
		try {
			// const updatedUser = await editUser(user);
			const updatedCategory = { ...category };
			dispatch({ type: 'EDIT_CATEGORY', payload: updatedCategory });
			Swal.fire({
				icon: 'success',
				title: 'Categoria editada correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.error('Error al editar la categoria:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar la categoria. Intente nuevamente!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return {
		state,
		dataCategorys,
		addCategoryAction,
		disableCategoryAction,
		enableCategoryAction,
		editCategoryAction,
	};
};
