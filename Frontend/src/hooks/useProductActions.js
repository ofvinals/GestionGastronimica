import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { apiURL } from '/api/apiURL.js';
import { showAlert, confirmAction } from '../utils/showAlert';

export const useProductActions = () => {
	const { dispatch } = useContext(ProductContext);

	// DEVUELVE PRODUCTOS GUARDADOS EN BACKEND
	const dataProducts = async () => {
		dispatch({
			type: 'DATA_PRODUCTS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const products = await apiURL.get('/api/products', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'DATA_PRODUCTS_SUCCESS',
				payload: products.data,
			});
			return products.data;
		} catch (error) {
			dispatch({
				type: 'DATA_PRODUCTS_ERROR',
				payload: error.message,
			});
			console.error('Error al buscar el producto:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar el producto. Intente nuevamente!',
			});
		}
	};

	// AGREGA NUEVOS PRODUCTOS
	const addProductAction = async (values) => {
		dispatch({
			type: 'DATA_PRODUCTS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const product = await apiURL.post('/api/products', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({
				type: 'ADD_PRODUCT_SUCCESS',
				payload: product.data,
			});
			showAlert({
				icon: 'success',
				title: 'Producto registrado correctamente',
			});
			return product.data;
		} catch (error) {
			dispatch({
				type: 'DATA_PRODUCTS_ERROR',
				payload: error.message,
			});
			console.error('Error al registra el producto:', error);
			showAlert({
				icon: 'error',
				title: 'Error al registrar el producto. Intente nuevamente!',
			});
		}
	};

	// INHABILITA PRODUCTO
	const disableProductAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la suspension del producto?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_PRODUCTS_PENDING',
			});
			try {
				const updatedValues = { status: false };
				const token = localStorage.getItem('token');
				const updatedProduct = await apiURL.put(
					`/api/products/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'DISABLE_PRODUCT_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Producto suspendido correctamente',
				});
				return updatedProduct.data;
			} catch (error) {
				dispatch({
					type: 'DATA_PRODUCTS_ERROR',
					payload: error.message,
				});
				console.error('Error al suspender el producto:', error);
				showAlert({
					icon: 'error',
					title: 'Error al suspender el producto. Intente nuevamente!',
				});
			}
		}
	};

	// HABILITA PRODUCTO
	const enableProductAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la habilitación del producto?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_PRODUCTS_PENDING',
			});
			try {
				const updatedValues = { status: true };
				const token = localStorage.getItem('token');
				const updatedProduct = await apiURL.put(
					`/api/products/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({
					type: 'ENABLE_PRODUCT_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Producto habilitado correctamente',
				});
				return updatedProduct.data;
			} catch (error) {
				dispatch({
					type: 'DATA_PRODUCTS_ERROR',
					payload: error.message,
				});
				console.error('Error al habilitar el producto:', error);
				showAlert({
					icon: 'error',
					title: 'Error al habilitar el producto. Intente nuevamente!',
				});
			}
		}
	};

	// EDITA PRODUCTO
	const editProductAction = async (id, values) => {
		dispatch({
			type: 'DATA_PRODUCTS_PENDING',
		});
		try {
			const token = localStorage.getItem('token');
			const updatedProduct = await apiURL.put(
				`/api/products/${id}`,
				values,
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'EDIT_PRODUCT_SUCCESS',
				payload: updatedProduct.data,
			});
			showAlert({
				icon: 'success',
				title: 'Producto editado correctamente',
			});
			return updatedProduct.data;
		} catch (error) {
			dispatch({
				type: 'DATA_PRODUCTS_ERROR',
				payload: error.message,
			});
			console.error('Error al editar el producto:', error);
			showAlert({
				icon: 'error',
				title: 'Error al editar el producto. Intente nuevamente!',
			});
		}
	};

	// BORRA PRODUCTO CON MENSAJE DE CONFIRMACION
	const deleteProductAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la eliminacion definitiva del producto?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({
				type: 'DATA_PRODUCTS_PENDING',
			});
			try {
				const token = localStorage.getItem('token');
				const deletedProduct = await apiURL.delete(`/api/products/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch({
					type: 'DELETE_PRODUCT_SUCCESS',
					payload: id,
				});
				showAlert({
					icon: 'success',
					title: 'Producto eliminado correctamente',
				});
				return deletedProduct.data;
			} catch (error) {
				dispatch({
					type: 'DATA_PRODUCTS_ERROR',
					payload: error.message,
				});
				showAlert({
					icon: 'error',
					title: 'Error al eliminar el producto. Intente nuevamente!',
				});
			}
		}
	};

	return {
		dataProducts,
		addProductAction,
		disableProductAction,
		enableProductAction,
		editProductAction,
		deleteProductAction,
	};
};
