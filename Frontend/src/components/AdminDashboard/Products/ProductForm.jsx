/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../Loader.jsx';
import { ProductContext } from '../../../context/ProductContext';
import { useProductActions } from '../../../hooks/useProductActions';

const ProductForm = ({ rowId, onClose, mode = 'edit' }) => {
	const [loading, setLoading] = useState(false);
	const { state } = useContext(ProductContext);
	const { editProductAction, addProductAction } = useProductActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const loadProduct = async () => {
		try {
			setLoading(true);
			const product = state.products.find((product) => product.id === rowId);
			if (product) {
				setValue('name', product.name);
				setValue('cant', product.cant);
				setValue('status', product.status);
			}
			setLoading(false);
		} catch (error) {
			console.error('Error al cargar los datos del producto', error);
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
				id: rowId,
				name: values.name,
				cant: values.subname,
				unit: values.unit,
				cost: values.cost,
				supplier: values.supplier,
				status: values.status,
			};

			if (mode === 'edit') {
				setLoading(true);
				await editProductAction(productData);
				setLoading(false);
				onClose();
			} else {
				setLoading(true);
				await addProductAction(productData);
				setLoading(false);
				onClose();
			}
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='name'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Nombre
						</Form.Label>
						<Form.Control
							type='text'
							{...register('name', {
								required: 'El nombre es requerido',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.name && (
							<span className='text-warning fs-6'>
								{errors.name.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='cant'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Cantidad
						</Form.Label>
						<Form.Control
							type='number'
							{...register('cant', {
								required: 'La cantidad es requerida',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.cant && (
							<span className='text-warning fs-6'>
								{errors.cant.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='unit'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Unidad
						</Form.Label>
						<Form.Control
							type='text'
							{...register('unit', {
								required: 'La unidad es requerida',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.unit && (
							<span className='text-warning fs-6'>
								{errors.unit.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='cost'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Costo
						</Form.Label>
						<Form.Control
							type='number'
							{...register('cost', {
								required: 'El costo es requerido',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.cost && (
							<span className='text-warning fs-6'>
								{errors.cost.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='supplier'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Proveedor
						</Form.Label>
						<Form.Control
							type='text'
							{...register('supplier', {
								required: 'El Proveedor es requerido',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.supplier && (
							<span className='text-warning fs-6'>
								{errors.supplier.message}
							</span>
						)}
					</Form.Group>
					<label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
						Producto Activo?
						<input
							className={`ml-2 mt-2 h-6 w-6 text-red-600 focus:ring-red-500 border-gray-300 rounded ${
								mode === 'view' ? 'cursor-not-allowed opacity-50' : ''
							}`}
							type='checkbox'
							value='status'
							{...register('status')}
							disabled={mode === 'view'}
						/>
					</label>

					<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
						{mode !== 'view' && (
							<Button
								type='submit'
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'>
								{mode === 'create'
									? 'Registrar Producto'
									: 'Guardar Cambios'}
							</Button>
						)}
						<Button
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'
							onClick={onClose}>
							{mode === 'view' ? 'Volver' : 'Cancelar'}
						</Button>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default ProductForm;
