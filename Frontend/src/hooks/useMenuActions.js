import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
import { apiURL } from '/api/apiURL.js';
import { showAlert, confirmAction } from '../utils/showAlert';

export const useMenuActions = () => {
	const { dispatch } = useContext(MenuContext);

	// DEVUELVE DATOS DE TODOS LOS MENUS CARGADOS
	const dataMenus = async () => {
		dispatch({
			type: 'DATA_MENUS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const menus = await apiURL.get('/api/menus', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'DATA_MENUS_SUCCESS',
				payload: menus.data,
			});
			return menus.data;
		} catch (error) {
			dispatch({
				type: 'DATA_MENUS_ERROR',
				payload: error.message,
			});
			console.error('Error al buscar el menu:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar el menu. Intente nuevamente!',
			});
		}
	};

	// AGREGA NUEVO MENU
	const addMenuAction = async (values) => {
		dispatch({
			type: 'DATA_MENUS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const menu = await apiURL.post('/api/menus', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'ADD_MENU_SUCCESS',
				payload: menu.data,
			});
			showAlert({
				icon: 'success',
				title: 'Menu registrado correctamente',
			});
			return menu.data;
		} catch (error) {
			dispatch({
				type: 'DATA_MENUS_ERROR',
				payload: error.message,
			});
			console.error('Error al registra el menu:', error);
			showAlert({
				icon: 'error',
				title: 'Error al registrar el menu. Intente nuevamente!',
			});
		}
	};

	// INHABILITA MENU
	const disableMenuAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la suspension del menu?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_MENUS_PENDING',
			});
			try {
				const updatedValues = { status: false };
				const token = localStorage.getItem('token');
				const updatedMenu = await apiURL.put(
					`/api/menus/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'DISABLE_MENU_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Menu suspendido correctamente',
				});
				return updatedMenu.data;
			} catch (error) {
				dispatch({
					type: 'DATA_MENUS_ERROR',
					payload: error.message,
				});
				console.error('Error al suspender el menu:', error);
				showAlert({
					icon: 'error',
					title: 'Error al suspender el menu. Intente nuevamente!',
				});
			}
		}
	};

	// HABILITA MENU
	const enableMenuAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la habilitación del menu?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_MENUS_PENDING',
			});
			try {
				const updatedValues = { status: true };
				const token = localStorage.getItem('token');
				const updatedMenu = await apiURL.put(
					`/api/menus/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'ENABLE_MENU_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Menu habilitado correctamente',
				});
				return updatedMenu.data;
			} catch (error) {
				dispatch({
					type: 'DATA_MENUS_ERROR',
					payload: error.message,
				});
				console.error('Error al habilitar el menu:', error);
				showAlert({
					icon: 'error',
					title: 'Error al habilitar el menu. Intente nuevamente!',
				});
			}
		}
	};

	// EDITA DATOS DEL MENU
	const editMenuAction = async (id, values) => {
		dispatch({
			type: 'DATA_MENUS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const updatedMenu = await apiURL.put(`/api/menus/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'EDIT_MENU_SUCCESS',
				payload: updatedMenu.data,
			});
			showAlert({
				icon: 'success',
				title: 'Menu editado correctamente',
			});
			return updatedMenu.data;
		} catch (error) {
			dispatch({
				type: 'DATA_MENUS_ERROR',
				payload: error.message,
			});
			console.error('Error al editar el menu:', error);
			showAlert({
				icon: 'error',
				title: 'Error al editar el menu. Intente nuevamente!',
			});
		}
	};

	// BORRA MENU CON MENSAJE DE CONFIRMACION
	const deleteMenuAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la eliminacion definitiva del menu?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_MENUS_PENDING',
			});
			try {
				const token = localStorage.getItem('token');
				const deletedMenu = await apiURL.delete(`/api/menus/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch({
					type: 'DELETE_MENU_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Menu eliminado correctamente',
				});
				return deletedMenu.data;
			} catch (error) {
				dispatch({ type: 'DATA_MENUS_ERROR', payload: error.message });
				showAlert({
					icon: 'error',
					title: 'Error al eliminar el menu. Intente nuevamente!',
				});
			}
		}
	};

	return {
		dataMenus,
		addMenuAction,
		disableMenuAction,
		enableMenuAction,
		editMenuAction,
		deleteMenuAction,
	};
};
