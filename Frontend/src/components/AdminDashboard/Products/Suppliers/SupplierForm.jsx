/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../../../../context/ProductContext';
import { useSupplierActions } from '../../../../hooks/useSupplierActions';
import GenericForm from '../../../../helpers/GenericForm';
import FormField from '../../../../helpers/FormField';

const SupplierForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state, loading } = useContext(ProductContext);
	const { editSupplierAction, addSupplierAction } = useSupplierActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

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

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadSupplier();
		}
	}, [rowId, mode]);

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
				await editSupplierAction(rowId, supplierData);
			} else {
				await addSupplierAction(supplierData);
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
				label='Nombre / Razon Social'
				register={register('name', { required: 'El nombre es requerido' })}
				errors={errors.name}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='email'
				label='Email'
				type='email'
				register={register('email', { required: 'El email es requerido' })}
				errors={errors.email}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='tel'
				label='Teléfono'
				type='number'
				register={register('tel', { required: 'El teléfono es requerido' })}
				errors={errors.tel}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='address'
				label='Domicilio'
				register={register('address', {
					required: 'El domicilio es requerido',
				})}
				errors={errors.address}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='cuit'
				label='CUIT'
				register={register('cuit', { required: 'El CUIT es requerido' })}
				errors={errors.cuit}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='comment'
				label='Comentarios'
				as='textarea'
				register={register('comment')}
				readOnly={mode === 'view'}
			/>
			<FormField
				id='status'
				label='Proveedor Activo?'
				type='checkbox'
				renderAs="toggle"
				register={register('status')}
				errors={errors.status}
				readOnly={mode === 'view'}
			/>
		</GenericForm>
	);
};

export default SupplierForm;
