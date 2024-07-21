import { useContext } from 'react';
import { apiURL } from '/api/apiURL.js';
import { MenuContext } from '../context/MenuContext';
import { showAlert, confirmAction } from '../helpers/showAlert';

export const useCategoryActions = () => {
	const { dispatch } = useContext(MenuContext);

	// RECUPERA CATEGORIAS DE MENU GUARDADAS EN BACKEND
	const dataCategorys = async () => {
		dispatch({
			type: 'DATA_CATEGORYS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const categorys = await apiURL.get('/api/categorys', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'DATA_CATEGORYS_SUCCESS',
				payload: categorys.data,
			});
			return categorys.data;
		} catch (error) {
			dispatch({
				type: 'DATA_USERS_ERROR',
				payload: error.message,
			});
			console.error('Error al buscar la categoria:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar la categoria. Intente nuevamente!',
			});
		}
	};

	// AGREGA NUEVAS CATEGORIAS DE MENU
	const addCategoryAction = async (values) => {
		dispatch({
			type: 'DATA_CATEGORYS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const category = await apiURL.post('/api/categorys', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'ADD_CATEGORY_SUCCESS',
				payload: category.data,
			});
			showAlert({
				icon: 'success',
				title: 'Categoria registrada correctamente',
			});
			return category.data;
		} catch (error) {
			dispatch({
				type: 'DATA_USERS_ERROR',
				payload: error.message,
			});
			console.error('Error al registrar la categoria:', error);
			showAlert({
				icon: 'error',
				title: 'Error al registrar la categoria. Intente nuevamente!',
			});
		}
	};

	// SUSPENDE CATEGORIA
	const disableCategoryAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la suspension de la categoria?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_CATEGORYS_PENDING',
			});
			try {
				const updatedValues = { status: false };
				const token = localStorage.getItem('token');
				const updatedCategory = await apiURL.put(
					`/api/categorys/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'DISABLE_CATEGORY_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Categoria suspendida correctamente',
				});
				return updatedCategory.data;
			} catch (error) {
				dispatch({
					type: 'DATA_USERS_ERROR',
					payload: error.message,
				});
				console.error('Error al suspender la categoria:', error);
				showAlert({
					icon: 'error',
					title: 'Error al suspender la categoria. Intente nuevamente!',
				});
			}
		}
	};

	// HABILITA CATEGORIA SUSPENDIDA
	const enableCategoryAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la habilitación de la categoria?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_CATEGORYS_PENDING',
			});
			try {
				const updatedValues = { status: true };
				const token = localStorage.getItem('token');
				const updatedCategory = await apiURL.put(
					`/api/categorys/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'ENABLE_CATEGORY_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Categoria habilitada correctamente',
				});
				return updatedCategory.data;
			} catch (error) {
				dispatch({
					type: 'DATA_USERS_ERROR',
					payload: error.message,
				});
				console.error('Error al habilitar la categoria:', error);
				showAlert({
					icon: 'error',
					title: 'Error al habilitar la categoria. Intente nuevamente!',
				});
			}
		}
	};

	// EDITA CATEGORIA DE MENU
	const editCategoryAction = async (id, values) => {
		dispatch({
			type: 'DATA_CATEGORYS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const updatedCategory = await apiURL.put(
				`/api/categorys/${id}`,
				values,
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'EDIT_CATEGORY_SUCCESS',
				payload: updatedCategory.data,
			});
			showAlert({
				icon: 'success',
				title: 'Categoria editada correctamente',
			});
			return updatedCategory.data;
		} catch (error) {
			dispatch({
				type: 'DATA_USERS_ERROR',
				payload: error.message,
			});
			console.error('Error al editar la categoria:', error);
			showAlert({
				icon: 'error',
				title: 'Error al editar la categoria. Intente nuevamente!',
			});
		}
	};

	// BORRA CATEGORIA DE MENU, CON MENSAJE DE CONFIRMACION
	const deleteCategoryAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la eliminacion definitiva de la categoria?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_CATEGORYS_PENDING',
			});
			try {
				const token = localStorage.getItem('token');
				const deletedCategory = await apiURL.delete(
					`/api/categorys/${id}`,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'DELETE_CATEGORY_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Categoria eliminada correctamente',
				});
				return deletedCategory.data;
			} catch (error) {
				dispatch({
					type: 'DATA_USERS_ERROR',
					payload: error.message,
				});
				showAlert({
					icon: 'error',
					title: 'Error al eliminar la categoria. Intente nuevamente!',
				});
			}
		}
	};

	return {
		dataCategorys,
		addCategoryAction,
		disableCategoryAction,
		enableCategoryAction,
		editCategoryAction,
		deleteCategoryAction,
	};
};
