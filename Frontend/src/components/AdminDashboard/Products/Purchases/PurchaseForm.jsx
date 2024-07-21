/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ProductContext } from '../../../../context/ProductContext.jsx';
import { usePurchaseActions } from '../../../../hooks/usePurchaseActions.js';
import GenericForm from '../../../../helpers/GenericForm.jsx';
import FormField from '../../../../helpers/FormField.jsx';
import Loader from '../../../../helpers/Loader.jsx';
import { useSupplierActions } from '../../../../hooks/useSupplierActions.js';

const PurchaseForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state, loading } = useContext(ProductContext);
	const { editPurchaseAction, addPurchaseAction, dataPurchases } =
		usePurchaseActions();
	const { dataSuppliers } = useSupplierActions();
	const {
		register,
		handleSubmit,
		setValue,
		control,
		watch,
		formState: { errors },
	} = useForm();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
	});

	useEffect(() => {
		dataSuppliers();
		dataPurchases();
	}, []);

	const loadPurchase = () => {
		const purchase = state.purchases.find(
			(purchase) => purchase._id === rowId
		);
		if (purchase) {
			setValue('name', purchase.name);
			setValue('items', purchase.items || []);
			setValue('comment', purchase.comment);
			setValue('status', purchase.status);
		}
	};

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadPurchase();
		}
	}, [rowId, mode]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			const purchaseData = {
				name: values.name,
				items: values.items,
				price: values.price,
				comment: values.comment,
				status: values.status,
			};
			if (mode === 'edit') {
				await editPurchaseAction(rowId, purchaseData);
			} else {
				await addPurchaseAction(purchaseData);
			}
			onClose();
		} catch (error) {
			console.error(error);
		}
	});

	const addItem = () => {
		append({ itemName: '', quantity: 1 });
	};

	const isStatusChecked = watch('status');

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
						as='select'
						mode={mode}
						label='Proveedor'
						disabled={mode === 'view'}
						register={register('name', {
							required: 'El proveedor es requerido',
						})}
						errors={errors.name}
						readOnly={mode === 'view'}>
						{state.suppliers.map((supplier) => (
							<option key={supplier._id} value={supplier.name}>
								{supplier.name}
							</option>
						))}
					</FormField>
					{errors.name && (
						<span className='text-red-700 fs-6'>
							{errors.name.message}
						</span>
					)}

					<div className='flex flex-col flex-wrap w-full gap-4 '>
						<label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Items pedidos*
						</label>
						{fields.map((item, index) => (
							<div
								key={item.id}
								className=' flex flex-row flex-wrap items-center justify-around'>
								<input
									{...register(`items.${index}.itemName`, {
										required: 'El Articulo es requerido',
									})}
									className={`p-2 form-control ${
										mode === 'view' ? 'bg-transparent' : 'form-control'
									}`}
									placeholder='Nombre del Articulo'
									readOnly={mode === 'view'}
								/>
								<input
									type='number'
									{...register(`items.${index}.quantity`, {
										required: 'La cantidad es requerida',
										min: 1,
									})}
									className={`w-[80px] form-control p-2 ${
										mode === 'view' ? 'bg-transparent' : 'form-control'
									}`}
									placeholder='Cantidad'
									readOnly={mode === 'view'}
								/>
								<button
									type='button'
									onClick={() => remove(index)}
									hidden={mode === 'view'}>
									<i className='fa-solid fa-ban text-xl bg-red-100 text-red-800 mx-2 border-2 hover:text-red-100 hover:border-red-800 hover:bg-red-800 rounded-full'></i>
								</button>
							</div>
						))}
						<div className='flex items-center justify-center'>
							<button
								type='button'
								onClick={addItem}
								className='w-fit bg-green-800 text-green-100 p-2 rounded-xl text-center items-center justify-center'
								hidden={mode === 'view'}>
								<i className='mx-1 fa-solid fa-circle-plus text-center text-xl text-green-100 hover:text-green-100 border-2 hover:border-green-800 rounded-full hover:bg-green-800'></i>
								Agregar Articulo
							</button>
						</div>
						{errors.items && (
							<span className='text-red-700 fs-6'>
								{errors.items.message}
							</span>
						)}
					</div>

					<FormField
						id='price'
						label='Monto total '
						type='number'
						mode={mode}
						register={register('price', {
							required:
								isStatusChecked &&
								'El monto total es requerido cuando el pedido es recibido',
						})}
						readOnly={mode === 'view'}
					/>
					{errors.price && (
						<span className='text-red-700 fs-6'>
							{errors.price.message}
						</span>
					)}

					<FormField
						id='comment'
						label='Comentarios'
						as='textarea'
						mode={mode}
						register={register('comment')}
						readOnly={mode === 'view'}
					/>
					<FormField
						id='status'
						label='Pedido Recibido?'
						type='checkbox'
						mode={mode}
						disabled={mode === 'view'}
						renderAs='toggle'
						register={register('status')}
						readOnly={mode === 'view'}
					/>
					<p className='text-sm'>(*) Campos obligatorios</p>
				</GenericForm>
			)}
		</>
	);
};

export default PurchaseForm;
