import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { showAlert, confirmAction } from '../helpers/showAlert';
import { apiURL } from '/api/apiURL.js';

export const useUserActions = () => {
	const { dispatch } = useContext(UserContext);

	const dataUsers = async () => {
		dispatch({
			type: 'DATA_USERS_PENDING',
		});
		try {
			const users = await apiURL.get('/api/users');
			dispatch({
				type: 'DATA_USERS_SUCCESS',
				payload: users.data,
			});
			console.log(users.data);
			return users.data;
		} catch (error) {
			dispatch({
				type: 'DATA_USERS_ERROR',
				payload: error.message,
			});
			console.error('Error al buscar el usuario:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar el usuario. Intente nuevamente!',
			});
		}
	};

	const addUserAction = async (user) => {
		dispatch({
			type: 'DATA_USERS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.post('/api/users', user, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'ADD_USER_SUCCESS',
				payload: res.data,
			});
			showAlert({
				icon: 'success',
				title: 'Usuario registrado correctamente',
			});
			return res.data;
		} catch (error) {
			dispatch({
				type: 'ADD_USER_ERROR',
				payload: error.message,
			});
			console.error('Error al registrar el usuario:', error);
			showAlert({
				icon: 'error',
				title: 'Error al registrar el usuario. Intente nuevamente!',
			});
		}
	};

	const disableUserAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la suspension del usuario?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({ type: 'DATA_USERS_PENDING' });
			try {
				const updatedValues = { status: false };
				const token = localStorage.getItem('token');
				const updatedUser = await apiURL.put(
					`/api/users/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'DISABLE_USER_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Usuario suspendido correctamente',
				});
				return updatedUser.data;
			} catch (error) {
				dispatch({
					type: 'DISABLE_USER_ERROR',
					payload: error.message,
				});
				console.error('Error al suspender al usuario:', error);
				showAlert({
					icon: 'error',
					title: 'Error al suspender el usuario. Intente nuevamente!',
				});
			}
		}
	};

	const enableUserAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la habilitación del usuario?',
			icon: 'warning',
			confirmButtonColor: '#085718',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_USERS_PENDING',
			});
			try {
				const updatedValues = { status: true };
				const token = localStorage.getItem('token');
				const updatedUser = await apiURL.put(
					`/api/users/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'ENABLE_USER_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Usuario habilitado correctamente',
				});
				return updatedUser.data;
			} catch (error) {
				dispatch({
					ype: 'ENABLE_USER_ERROR',
					payload: error.message,
				});
				console.error('Error al habilitar el usuario:', error);
				showAlert({
					icon: 'error',
					title: 'Error al habilitar el usuario. Intente nuevamente!',
				});
			}
		}
	};

	const editUserAction = async (id, values) => {
		dispatch({
			type: 'DATA_USERS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const updatedUser = await apiURL.put(`/api/users/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'EDIT_USER_SUCCESS',
				payload: updatedUser.data,
			});
			showAlert({
				icon: 'success',
				title: 'Usuario editado correctamente',
			});
			return updatedUser.data;
		} catch (error) {
			dispatch({
				type: 'EDIT_USER_ERROR',
				payload: error.message,
			});
			console.error('Error al editar el usuario:', error);
			showAlert({
				icon: 'error',
				title: 'Error al editar el usuario. Intente nuevamente!',
			});
		}
	};

	const deleteUserAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la eliminación del usuario?',
			icon: 'warning',
			confirmButtonColor: '#085718',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_USERS_PENDING',
			});
			try {
				const token = localStorage.getItem('token');
				const deletedUser = await apiURL.delete(`/api/users/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch({
					type: 'DELETE_USER_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Usuario eliminado correctamente',
				});
				return deletedUser.data;
			} catch (error) {
				dispatch({
					type: 'DELETE_USER_ERROR',
					payload: error.message,
				});
				showAlert({
					icon: 'error',
					title: 'Error al eliminar el usuario. Intente nuevamente!',
				});
			}
		}
	};

	return {
		dataUsers,
		addUserAction,
		disableUserAction,
		enableUserAction,
		editUserAction,
		deleteUserAction,
	};
};
