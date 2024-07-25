/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../../../../context/ProductContext';
import { useSupplierActions } from '../../../../hooks/useSupplierActions.js';
import GenericForm from '../../../../utils/GenericForm';
import FormField from '../../../../utils/FormField';

const SupplierForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state } = useContext(ProductContext);
	const { editSupplierAction, addSupplierAction } = useSupplierActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// BUSCA Y CARGA EL PROVEEDOR SELECCIONADO
	const loadSupplier = () => {
		const supplier = state.suppliers.find(
			(supplier) => supplier._id === rowId
		);
		if (supplier) {
			setValue('name', supplier.name);
			setValue('email', supplier.email);
			setValue('tel', supplier.tel);
			setValue('address', supplier.address);
			setValue('cuit', supplier.cuit);
			setValue('comment', supplier.comment);
			setValue('status', supplier.status);
		}
	};
	// SI EL MODE ES EDIT O VIEW CARGA LOS DATOS
	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadSupplier();
		}
	}, [rowId, mode]);

	// PREPARA DATOS P ENVIAR A BACKEND
	const onSubmit = handleSubmit(async (values) => {
		try {
			const supplierData = {
				name: values.name,
				email: values.email,
				tel: values.tel,
				address: values.address,
				cuit: values.cuit,
				comment: values.comment,
				status: values.status,
			};
			if (mode === 'edit') {
				// SI MODE ES EDIT EJECUTA ACCION P EDITAR
				await editSupplierAction(rowId, supplierData);
			} else {
				// SI ES ADD EJECUTA ACCION P AGREGAR
				await addSupplierAction(supplierData);
			}
			// CIERRA MODAL
			onClose();
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<>
				<GenericForm
					loading={state.loading}
					onSubmit={onSubmit}
					onClose={onClose}
					mode={mode}>
					<FormField
						id='name'
						mode={mode}
						label='Nombre / Razon Social*'
						register={register('name', {
							required: 'El nombre es requerido',
						})}
						errors={errors.name}
						readOnly={mode === 'view'}
					/>{' '}
					{errors.name && (
						<span className='text-red-700 fs-6'>
							{errors.name.message}
						</span>
					)}
					<FormField
						id='email'
						label='Email*'
						mode={mode}
						type='email'
						register={register('email', {
							required: 'El email es requerido',
						})}
						errors={errors.email}
						readOnly={mode === 'view'}
					/>{' '}
					{errors.email && (
						<span className='text-red-700 fs-6'>
							{errors.email.message}
						</span>
					)}
					<FormField
						id='tel'
						label='Teléfono*'
						type='number'
						mode={mode}
						register={register('tel', {
							required: 'El teléfono es requerido',
						})}
						errors={errors.tel}
						readOnly={mode === 'view'}
					/>{' '}
					{errors.tel && (
						<span className='text-red-700 fs-6'>
							{errors.tel.message}
						</span>
					)}
					<FormField
						id='address'
						label='Domicilio*'
						mode={mode}
						register={register('address', {
							required: 'El domicilio es requerido',
						})}
						errors={errors.address}
						readOnly={mode === 'view'}
					/>{' '}
					{errors.address && (
						<span className='text-red-700 fs-6'>
							{errors.address.message}
						</span>
					)}
					<FormField
						id='cuit'
						label='CUIT*'
						mode={mode}
						register={register('cuit', {
							required: 'El CUIT es requerido',
						})}
						errors={errors.cuit}
						readOnly={mode === 'view'}
					/>{' '}
					{errors.cuit && (
						<span className='text-red-700 fs-6'>
							{errors.cuit.message}
						</span>
					)}
					<FormField
						id='comment'
						label='Comentarios'
						as='textarea'
						mode={mode}
						register={register('comment')}
						readOnly={mode === 'view'}
					/>{' '}
					<FormField
						id='status'
						label='Proveedor Activo?'
						type='checkbox'
						mode={mode}
						renderAs='toggle'
						register={register('status')}
						readOnly={mode === 'view'}
					/>{' '}
					<p className='text-sm'>(*) Campos obligatorios</p>
				</GenericForm>
		
		</>
	);
};

export default SupplierForm;
