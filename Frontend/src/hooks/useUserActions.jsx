import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
// import { getUsers, disableUser, enableUser, editUser } from '../../hooks/useUsers';

export const useUserActions = () => {
	const { dispatch } = useContext(UserContext);

	const dataUsers = async () => {
		dispatch({ type: 'DATA_USERS_REQUEST' });
		try {
			// const users = await getUsers();
			const users = [
				{
					id: 0,
					name: 'jose',
					subname: 'perez',
					rol: 'admin',
					status: false,
				},
				{
					id: 1,
					name: 'mario',
					subname: 'gomez',
					rol: 'server',
					status: false,
				},
			];
			dispatch({ type: 'DATA_USERS', payload: users });
		} catch (error) {
         console.error('Error al buscar el usuario:', error);		}
	};

	const addUserAction =async(user)=>{
		try {
			// const addUser = await addUser(user);
			dispatch({ type: 'ADD_USER', payload: user });
			Swal.fire({
				icon: 'success',
				title: 'Usuario registrado correctamente',
				showConfirmButton: false,
				timer: 2500,
			});
		} catch (error) {
			console.error('Error al registra el usuario:', error);
		}
	}

	const disableUserAction = async (id) => {
		const result = await Swal.fire({
			title: 'Confirmas la inhabilitacion del usuario?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#8f8e8b',
			confirmButtonText: 'Sí, confirmar',
			cancelButtonText: 'Cancelar',
		});
		if (result.isConfirmed) {
			try {
				// const updatedUser = await disableUser(id);

				dispatch({ type: 'DISABLE_USER', payload: id });
				Swal.fire({
					icon: 'success',
					title: 'Usuario inhabilitado correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
			} catch (error) {
				console.error('Error al suspender al usuario:', error);
			}
		}
	};

	const enableUserAction = async (id) => {
		const result = await Swal.fire({
			title: 'Confirmas la habilitacion del usuario?',
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
				dispatch({ type: 'ENABLE_USER', payload: id });
				Swal.fire({
					icon: 'success',
					title: 'Usuario habilitado correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
			} catch (error) {
				console.error('Error al habilitar el usuario:', error);
			}
		}
	};

	const editUserAction = async (user) => {
		try {
			// const updatedUser = await editUser(user);
			const updatedUser = { ...user };
			dispatch({ type: 'EDIT_USER', payload: updatedUser });
			Swal.fire({
				icon: 'success',
				title: 'Usuario editado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.error('Error al editar el usuario:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar el usuario. Intente nuevamente!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return {
		dataUsers,
		addUserAction,
		disableUserAction,
		enableUserAction,
		editUserAction,
	};
};
