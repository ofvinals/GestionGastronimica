import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import Swal from 'sweetalert2';
// import { getUsers, disableUser, enableUser, editUser } from '../../hooks/useUsers';

export const useProductActions = () => {
	const { dispatch } = useContext(ProductContext);

	const dataProducts = async () => {
		dispatch({ type: 'DATA_PRODUCTS_REQUEST' });
		try {
			// const users = await getUsers();
			const products = [
				{
					id: 0,
					name: 'peras',
					cant: 20,
					status: false,
				},
				{
					id: 1,
					name: 'manzanas',
					cant: 10,
					status: false,
				},
			];
			dispatch({ type: 'DATA_PRODUCTS', payload: products });
		} catch (error) {
			console.error('Error al buscar el producto:', error);
		}
	};

	const addProductAction = async (product) => {
		try {
			// const addUser = await addUser(user);
			dispatch({ type: 'ADD_PRODUCT', payload: product });
			Swal.fire({
				icon: 'success',
				title: 'Producto registrado correctamente',
				showConfirmButton: false,
				timer: 2500,
			});
		} catch (error) {
			console.error('Error al registra el producto:', error);
		}
	};

	const disableProductAction = async (id) => {
		const result = await Swal.fire({
			title: 'Confirmas la inhabilitacion del producto?',
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

				dispatch({ type: 'DISABLE_PRODUCT', payload: id });
				Swal.fire({
					icon: 'success',
					title: 'Producto inhabilitado correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
			} catch (error) {
				console.error('Error al suspender el producto:', error);
			}
		}
	};

	const enableProductAction = async (id) => {
		const result = await Swal.fire({
			title: 'Confirmas la habilitacion del producto?',
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
				dispatch({ type: 'ENABLE_PRODUCT', payload: id });
				Swal.fire({
					icon: 'success',
					title: 'Producto habilitado correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
			} catch (error) {
				console.error('Error al habilitar el producto:', error);
			}
		}
	};

	const editProductAction = async (product) => {
		try {
			// const updatedUser = await editUser(user);
			const updatedProduct = { ...product };
			dispatch({ type: 'EDIT_PRODUCT', payload: updatedProduct });
			Swal.fire({
				icon: 'success',
				title: 'Producto editado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.error('Error al editar el producto:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar el producto. Intente nuevamente!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return {
		dataProducts,
		addProductAction,
		disableProductAction,
		enableProductAction,
		editProductAction,
	};
};
