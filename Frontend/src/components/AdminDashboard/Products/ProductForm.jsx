/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../../../context/ProductContext';
import { useProductActions } from '../../../hooks/useProductActions';
import GenericForm from '../../../helpers/GenericForm';
import FormField from '../../../helpers/FormField';
import Loader from '../../../helpers/Loader';

const ProductForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state, loading } = useContext(ProductContext);
	const { editProductAction, addProductAction } = useProductActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// FILTRA EL PRODUCTO SELECCIONADO Y CARGA LOS DATOS
	const loadProduct = () => {
		const product = state.products.find((product) => product._id === rowId);
		if (product) {
			setValue('name', product.name);
			setValue('cant', product.cant);
			setValue('cost', product.cost);
			setValue('unit', product.unit);
			setValue('supplier', product.supplier);
			setValue('status', product.status);
		}
	};

	// CARGA PRODUCTOS DE BACKEND
	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadProduct();
		}
	}, [rowId, mode]);

	// SUBMIT PARA PREPARAR DATOS Y ENVIAR A REDUCE Y BACKEND
	const onSubmit = handleSubmit(async (values) => {
		try {
			const productData = {
				name: values.name,
				cant: values.cant,
				unit: values.unit,
				cost: values.cost,
				supplier: values.supplier,
				status: values.status,
			};
			if (mode === 'edit') {
				// EJECUTA EDIT SEGUN MODE
				await editProductAction(rowId, productData);
			} else {
				// EJECUTA ADD SEGUN MODE
				await addProductAction(productData);
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
						register={register('name', {
							required: 'El nombre es requerido.',
						})}
						errors={errors.name}
						readOnly={mode === 'view'}
					/>
					{errors.name && (
						<span className='text-red-700 fs-6'>
							{errors.name.message}
						</span>
					)}
					<FormField
						id='cant'
						label='Cantidad*'
						type='number'
						register={register('cant', {
							required: 'La cantidad es requerida.',
						})}
						errors={errors.cant}
						readOnly={mode === 'view'}
					/>
					{errors.cant && (
						<span className='text-red-700 fs-6'>
							{errors.cant.message}
						</span>
					)}
					<FormField
						id='unit'
						label='Unidad*'
						as='select'
						register={register('unit', {
							required: 'La unidad es requerida',
						})}
						errors={errors.unit}
						readOnly={mode === 'view'}>
						<option value=''>Selecciona la unidad de medida</option>
						<option value='Unidades'>Unidades</option>
						<option value='Litros'>Litros</option>
						<option value='Kilogramos'>Kilogramos</option>
					</FormField>
					{errors.unit && (
						<span className='text-red-700 fs-6'>
							{errors.unit.message}
						</span>
					)}
					<FormField
						id='cost'
						label='Costo*'
						type='number'
						register={register('cost', {
							required: 'El costo es requerido.',
						})}
						errors={errors.cost}
						readOnly={mode === 'view'}
					/>
					{errors.cost && (
						<span className='text-red-700 fs-6'>
							{errors.cost.message}
						</span>
					)}
					<FormField
						id='supplier'
						label='Proveedor'
						register={register('supplier')}
						readOnly={mode === 'view'}
					/>
					<FormField
						id='status'
						label='Producto Activo?'
						type='checkbox'
						register={register('status')}
						renderAs='toggle'
						readOnly={mode === 'view'}
					/>{' '}
					<p className='text-sm'>(*) Campos obligatorios</p>
				</GenericForm>
			)}
		</>
	);
};

export default ProductForm;
