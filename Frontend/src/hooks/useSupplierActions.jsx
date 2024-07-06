import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { apiURL } from '/api/apiURL.js';
import { showAlert, confirmAction } from '../helpers/showAlert';

export const useSupplierActions = () => {
	const { dispatch } = useContext(ProductContext);

	const dataSuppliers = async () => {
		dispatch({ type: 'DATA_SUPPLIERS_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const suppliers = await apiURL.get('/api/suppliers', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({ type: 'DATA_SUPPLIERS_SUCCESS', payload: suppliers.data });
			return suppliers.data;
		} catch (error) {
			dispatch({ type: 'DATA_SUPPLIERS_ERROR', payload: error.message });
			console.error('Error al buscar el proveedor:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar el proveedor. Intente nuevamente!',
			});
		}
	};

	const addSupplierAction = async (values) => {
		dispatch({ type: 'DATA_SUPPLIERS_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const supplier = await apiURL.post('/api/suppliers', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch({ type: 'ADD_SUPPLIER_SUCCESS', payload: supplier.data });
			showAlert({
				icon: 'success',
				title: 'Proveedor registrado correctamente',
			});
			return supplier.data;
		} catch (error) {
			dispatch({ type: 'DATA_SUPPLIERS_ERROR', payload: error.message });
			console.error('Error al registra el proveedor:', error);
			showAlert({
				icon: 'error',
				title: 'Error al buscar el proveedor. Intente nuevamente!',
			});
		}
	};

	const disableSupplierAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la suspension del proveedor?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({ type: 'DATA_SUPPLIERS_PENDING' });
			try {
				const updatedValues = { status: false };
				const token = localStorage.getItem('token');
				const updatedSupplier = await apiURL.put(
					`/api/suppliers/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({ type: 'DISABLE_SUPPLIER_SUCCESS', payload: id });
				showAlert({
					icon: 'success',
					title: 'Proveedor inhabilitado correctamente',
				});
				return updatedSupplier.data;
			} catch (error) {
				dispatch({ type: 'DATA_SUPPLIERS_ERROR', payload: error.message });
				console.error('Error al suspender el proveedor:', error);
				showAlert({
					icon: 'error',
					title: 'Error al suspender el proveedor. Intente nuevamente!',
				});
			}
		}
	};

	const enableSupplierAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la habilitacion del proveedor?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({ type: 'DATA_SUPPLIERS_PENDING' });
			try {
				const updatedValues = { status: true };
				const token = localStorage.getItem('token');
				const updatedSupplier = await apiURL.put(
					`/api/suppliers/${id}`,
					updatedValues,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({ type: 'ENABLE_SUPPLIER_SUCCESS', payload: id });
				showAlert({
					icon: 'success',
					title: 'Proveedor habilitado correctamente',
				});
				return updatedSupplier.data;
			} catch (error) {
				dispatch({ type: 'DATA_SUPPLIERS_ERROR', payload: error.message });
				console.error('Error al habilitar el proveedor:', error);
				showAlert({
					icon: 'error',
					title: 'Error al habilitar el usuario. Intente nuevamente!',
				});
			}
		}
	};

	const editSupplierAction = async (id, values) => {
		dispatch({ type: 'DATA_SUPPLIERS_PENDING' });
		try {
			const token = localStorage.getItem('token');
			const updatedSupplier = await apiURL.put(
				`/api/suppliers/${id}`,
				values,
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			dispatch({
				type: 'EDIT_SUPPLIER_SUCCESS',
				payload: updatedSupplier.data,
			});
			showAlert({
				icon: 'success',
				title: 'Proveedor editado correctamente',
			});
			return updatedSupplier.data;
		} catch (error) {
			dispatch({ type: 'DATA_SUPPLIERS_ERROR', payload: error.message });
			console.error('Error al editar el proveedor:', error);
			showAlert({
				icon: 'error',
				title: 'Error al editar el proveedor. Intente nuevamente!',
			});
		}
	};

	const deleteSupplierAction = async (id) => {
		const isConfirmed = await confirmAction({
			title: 'Confirmas la eliminacion definitiva del proveedor?',
			icon: 'warning',
		});
		if (isConfirmed) {
			dispatch({ type: 'DATA_SUPPLIERS_PENDING' });
			try {
				const token = localStorage.getItem('token');
				const deletedSupplier = await apiURL.delete(
					`/api/suppliers/${id}`,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch({ type: 'DELETE_SUPPLIER_SUCCESS', payload: id });
				showAlert({
					icon: 'success',
					title: 'Proveedor eliminado correctamente',
				});
				return deletedSupplier.data;
			} catch (error) {
				dispatch({ type: 'DATA_SUPPLIERS_ERROR', payload: error.message });
				console.log(error);
				showAlert({
					icon: 'error',
					title: 'Error al eliminar el proveedor. Intente nuevamente!',
				});
			}
		}
	};

	return {
		dataSuppliers,
		addSupplierAction,
		disableSupplierAction,
		enableSupplierAction,
		editSupplierAction,
		deleteSupplierAction,
	};
};
