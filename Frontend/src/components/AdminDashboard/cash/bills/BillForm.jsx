/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { BillContext } from '../../../../context/BillContext.jsx';
import { useForm } from 'react-hook-form';
import { useBillActions } from '../../../../hooks/useBillActions.js';
import { Form, FormSelect } from 'react-bootstrap';
import { DateTime } from 'luxon';
import { Button } from 'primereact/button';

const BillForm = ({ rowId, onClose, mode = 'edit' }) => {
	const { state } = useContext(BillContext);
	const { editBillAction, addBillAction } = useBillActions();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// FORMATEA LA FECHA A ZONA ARGENTINA
	const formatFecha = (fechaISO) => {
		const fechaUTC = DateTime.fromISO(fechaISO, { zone: 'utc' });
		const fechaBuenosAires = fechaUTC.setZone(
			'America/Argentina/Buenos_Aires'
		);
		return fechaBuenosAires.toFormat('dd/MM/yyyy - HH:mm:ss');
	};

	// CARGA DATOS DE LA ORDEN
	const loadBill = () => {
		const bill = state.bills.find((bill) => bill._id === rowId);
		if (bill) {
			const fechaFormateadaOpen = formatFecha(bill.date);
			setValue('date', bill.date);
			setValue('price', bill.price);
			setValue('formPay', bill.formPay);
			setValue('supplier', bill.supplier);
			setValue('openAt', fechaFormateadaOpen);
			setValue('receiptNum', bill.receiptNum);
			setValue('receiptType', bill.receiptType);
			setValue('status', bill.status);
			setValue('comments', bill.comments);
		}
	};

	// SI ES EDIT O VIEW EJECUTA LOADORDER
	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadBill();
		}
	}, [rowId, mode]);

	// PREPARA LOS VALUES
	const onSubmit = handleSubmit(async (values) => {
		try {
			const billData = {
				date: values.date,
				price: values.price,
				formPay: values.formPay,
				supplier: values.supplier,
				receiptNum: values.receiptNum,
				receiptType: values.receiptType,
				status: values.status,
				comments: values.comments,
			};
			if (mode === 'edit') {
				// SI EDIT ABRE MODAL DE EDICION
				await editBillAction(rowId, billData);
			} else {
				// SI ADD ABRE MODAL PARA AGREGAR ORDER
				await addBillAction(billData);
			}
			onClose();
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<>
			<Form onSubmit={onSubmit}>
				<div className='flex flex-row flex-wrap items-center justify-around'>
					<Form.Group controlId='salon'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Fecha
						</Form.Label>
						<Form.Control
							className={`${
								mode === 'view' || mode === 'edit'
									? 'border-none focus:border-none focus:outline-none bg-transparent'
									: ''
							}`}
							type='date'
							{...register('date', {
								required: 'La fecha es obligatoria',
							})}
							readOnly={mode === 'view' || mode === 'edit'}
						/>
						{errors.date && (
							<span className='text-warning fs-6'>
								{errors.date.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='tableNum'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Monto
						</Form.Label>
						<Form.Control
							className={`${
								mode === 'view' || mode === 'edit'
									? 'border-none focus:border-none focus:outline-none bg-transparent'
									: ''
							}`}
							type='number'
							{...register('price', {
								required: 'El monto es obligatorio',
							})}
							readOnly={mode === 'view' || mode === 'edit'}
						/>
						{errors.price && (
							<span className='text-warning fs-6'>
								{errors.price.message}
							</span>
						)}
					</Form.Group>
				</div>
				<div className='flex flex-row flex-wrap items-center justify-around'>
					<Form.Group controlId='diners'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Proveedor
						</Form.Label>
						<Form.Control
							className={`${
								mode === 'view'
									? 'border-none focus:border-none focus:outline-none bg-transparent'
									: ''
							}`}
							type='text'
							{...register('supplier')}
							readOnly={mode === 'view'}></Form.Control>
						{errors.supplier && (
							<span className='text-warning fs-6'>
								{errors.supplier.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='receiptType'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Tipo de Comprobante
						</Form.Label>
						<FormSelect
							className={`${
								mode === 'view' || mode === 'edit'
									? 'border-none focus:border-none focus:outline-none bg-transparent'
									: ''
							}`}
							disabled={mode === 'view'}
							type='text'
							{...register('receiptType', {
								required: 'El tipo de comprobante es obligatorio',
							})}
							readOnly={mode === 'view' || mode === 'edit'}>
							<option value=''>Seleccione una opcion</option>
							<option value='Factura A'>Factura A</option>
							<option value='Factura B'>Factura B</option>
							<option value='Factura C'>Factura C</option>
							<option value='Ticket'>Ticket comun</option>
						</FormSelect>
						{errors.receiptType && (
							<span className='text-warning fs-6'>
								{errors.receiptType.message}
							</span>
						)}
					</Form.Group>
					<Form.Group className='w-1/2' controlId='receiptNum'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Numero de Comprobante
						</Form.Label>
						<Form.Control
							className={`${
								mode === 'view' || mode === 'edit'
									? 'border-none focus:border-none focus:outline-none bg-transparent'
									: ''
							}`}
							type='text'
							{...register('receiptNum', {
								required: 'El numero de comprobante es obligatorio',
							})}
							readOnly={mode === 'view' || mode === 'edit'}
						/>
						{errors.receiptNum && (
							<span className='text-warning fs-6'>
								{errors.receiptNum.message}
							</span>
						)}
					</Form.Group>
					<Form.Group
						className='flex flex-col flex-wrap items-center justify-center'
						controlId='cash'>
						<Form.Label className='mr-2 text-start bg-transparent text-xl mb-0 mt-2 text-background font-medium'>
							Forma de Pago
						</Form.Label>
						<FormSelect
							className={`${
								mode === 'view'
									? ' border-none focus:border-none focus:outline-none bg-transparent'
									: ''
							}`}
							disabled={mode === 'view'}
							type='text'
							{...register('formPay', {
								required: 'La forma de pago es obligatoria',
							})}
							readOnly={mode === 'view'}>
							<option value='Efectivo'>Efectivo</option>
							<option value='Tarjeta Credito/Debito'>
								Tarjeta Credito/Debito
							</option>
							<option value='Cheque'>Cheque</option>
						</FormSelect>
						{errors.formPay && (
							<span className='text-warning fs-6'>
								{errors.formPay.message}
							</span>
						)}
					</Form.Group>
				</div>
				<div className='flex w-full flex-row flex-wrap items-center justify-around'>
					<Form.Group className='w-full mx-5' controlId='comments'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background font-medium'>
							Comentarios
						</Form.Label>
						<Form.Control
							className={`${
								mode === 'view' || mode === 'edit'
									? 'border-none focus:border-none focus:outline-none bg-transparent'
									: ''
							}`}
							as='textarea'
							rows={5}
							type='text'
							{...register('comments')}
							readOnly={
								mode === 'view' || mode === 'edit'
							}></Form.Control>
						{errors.comments && (
							<span className='text-warning fs-6'>
								{errors.comments.message}
							</span>
						)}
					</Form.Group>
				</div>

				<Form.Group className='flex flex-wrap items-center justify-around mt-3'>
					{mode !== 'view' && (
						<Button
							type='submit'
							tooltip='Confirmar'
							tooltipOptions={{ position: 'top' }}
							className='noborder text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'>
							<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
						</Button>
					)}
					<Button
						type='button'
						tooltip='Cerrar'
						tooltipOptions={{ position: 'top' }}
						className='noborder text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'
						onClick={onClose}>
						<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>
					</Button>
				</Form.Group>
			</Form>
		</>
	);
};

export default BillForm;
