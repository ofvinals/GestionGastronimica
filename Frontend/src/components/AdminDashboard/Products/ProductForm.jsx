/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../../../context/ProductContext';
import { useProductActions } from '../../../hooks/useProductActions';
import GenericForm from '../../../helpers/GenericForm';
import FormField from '../../../helpers/FormField';

const ProductForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state, loading } = useContext(ProductContext);
	const { editProductAction, addProductAction } = useProductActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

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

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadProduct();
		}
	}, [rowId, mode]);

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
				await editProductAction(rowId, productData);
			} else {
				await addProductAction(productData);
			}
			onClose();
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<GenericForm
			loading={loading}
			onSubmit={onSubmit}
			onClose={onClose}
			mode={mode}>
			<FormField
				id='name'
				label='Nombre'
				register={register('name', { required: 'El nombre es requerido.' })}
				errors={errors.name}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='cant'
				label='Cantidad'
				type='number'
				register={register('cant', {
					required: 'La cantidad es requerida.',
				})}
				errors={errors.cant}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='unit'
				label='Unidad'
				as='select'
				register={register('unit', { required: 'La unidad es requerida' })}
				errors={errors.unit}
				readOnly={mode === 'view'}>
				<option>Selecciona la unidad de medida</option>
				<option value='Unidades'>Unidades</option>
				<option value='Litros'>Litros</option>
				<option value='Kilogramos'>Kilogramos</option>
			</FormField>
			<FormField
				id='cost'
				label='Costo'
				type='number'
				register={register('cost', { required: 'El costo es requerido.' })}
				errors={errors.cost}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='supplier'
				label='Proveedor'
				register={register('supplier', {
					required: 'El proveedor es requerido',
				})}
				errors={errors.supplier}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='status'
				label='Producto Activo?'
				type='checkbox'
				register={register('status')}
				errors={errors.status}
				className={`ml-2 mt-2 h-6 w-6 text-red-600 focus:ring-red-500 border-gray-300 rounded ${
					mode === 'view' ? 'cursor-not-allowed opacity-50' : ''
				}`}
				readOnly={mode === 'view'}
			/>
		</GenericForm>
	);
};

export default ProductForm;
