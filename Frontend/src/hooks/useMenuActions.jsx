import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
import Swal from 'sweetalert2';
// import { getUsers, disableUser, enableUser, editUser } from '../../hooks/useUsers';

export const useMenuActions = () => {
	const { dispatch } = useContext(MenuContext);

	const dataMenus = async () => {
		dispatch({ type: 'DATA_MENUS_REQUEST' });
		try {
			// const users = await getUsers();
			const menus = [
				{
					id: 0,
					name: 'peras al horno',
					description: 'peras al horno',
					price: 2000,
					category: 'Postres',
					status: false,
				},
				{
					id: 1,
					name: 'manzanas',
					description: 'manzanas al horno',
					price: 2000,
					category: 'Carnes',
					status: false,
				},
			];
			dispatch({ type: 'DATA_MENUS', payload: menus });
		} catch (error) {
			console.error('Error al buscar el menu:', error);
		}
	};

	const addMenuAction = async (menu) => {
		try {
			// const addUser = await addUser(user);
			dispatch({ type: 'ADD_MENU', payload: menu });
			Swal.fire({
				icon: 'success',
				title: 'Menu registrado correctamente',
				showConfirmButton: false,
				timer: 2500,
			});
		} catch (error) {
			console.error('Error al registra el menu:', error);
		}
	};

	const disableMenuAction = async (id) => {
		const result = await Swal.fire({
			title: 'Confirmas la inhabilitacion del menu?',
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

				dispatch({ type: 'DISABLE_MENU', payload: id });
				Swal.fire({
					icon: 'success',
					title: 'Menu inhabilitado correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
			} catch (error) {
				console.error('Error al suspender el menu:', error);
			}
		}
	};

	const enableMenuAction = async (id) => {
		const result = await Swal.fire({
			title: 'Confirmas la habilitacion del menu?',
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
				dispatch({ type: 'ENABLE_MENU', payload: id });
				Swal.fire({
					icon: 'success',
					title: 'Menu habilitado correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
			} catch (error) {
				console.error('Error al habilitar el menu:', error);
			}
		}
	};

	const editMenuAction = async (menu) => {
		try {
			// const updatedUser = await editUser(user);
			const updatedMenu = { ...menu };
			dispatch({ type: 'EDIT_MENU', payload: updatedMenu });
			Swal.fire({
				icon: 'success',
				title: 'Menu editado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.error('Error al editar el menu:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar el menu. Intente nuevamente!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return {
		dataMenus,
		addMenuAction,
		disableMenuAction,
		enableMenuAction,
		editMenuAction,
	};
};
