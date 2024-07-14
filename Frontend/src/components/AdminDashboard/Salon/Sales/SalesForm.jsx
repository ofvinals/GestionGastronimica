/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../../../context/OrderContext.jsx';
import { useForm } from 'react-hook-form';
import { useOrderActions } from '../../../../hooks/useOrderActions.jsx';
import Loader from '../../../../helpers/Loader.jsx';
import { Form, FormSelect } from 'react-bootstrap';
import { DateTime } from 'luxon';
import { Button } from 'primereact/button';

const SalesForm = ({ rowId, onClose, mode = 'edit' }) => {
	const [order, setOrder] = useState({});
	const { state, loading } = useContext(OrderContext);
	const { editOrderAction, addOrderAction } = useOrderActions();
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
	const loadOrder = () => {
		const order = state.orders.find((order) => order._id === rowId);
		console.log(order);
		if (order) {
			const fechaFormateadaOpen = formatFecha(order.openAt);
			const fechaFormateadaClose = order.closeTime
				? formatFecha(order.closeTime)
				: 'Sin datos de cierre';
			setValue('salonName', order.salonName);
			setValue('tableNum', order.tableNum);
			setValue('server', order.server);
			setValue('diners', order.diners);
			setValue('openAt', fechaFormateadaOpen);
			setValue('closeAt', fechaFormateadaClose);
			setValue('items', order.items);
			setValue('additionalCharges', order.additionalCharges);
			setValue('finalPrice', order.finalPrice);
			setValue('elapsedDuration', order.elapsedDuration);
			setValue('orderCash', order.orderCash);
			setOrder(order);
		}
	};

	// SI ES EDIT O VIEW EJECUTA LOADORDER
	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadOrder();
		}
	}, [rowId, mode]);

	// PREPARA LOS VALUES
	const onSubmit = handleSubmit(async (values) => {
		try {
			const orderData = {
				salonName: values.salonName,
				tableNum: values.tableNum,
				diners: values.diners,
				server: values.server,
				openAt: order.openAt,
				closeAt: order.closeAt,
				items: values.items,
				finalPrice: values.finalPrice,
				additionalCharges: values.additionalCharges,
				elapsedDuration: order.elapsedDuration,
				orderCash: values.orderCash,
			};
			if (mode === 'edit') {
				// SI EDIT ABRE MODAL DE EDICION
				await editOrderAction(rowId, orderData);
			} else {
				// SI ADD ABRE MODAL PARA AGREGAR ORDER
				await addOrderAction(orderData);
			}
			onClose();
		} catch (error) {
			console.error(error);
		}
	});

	// CALCULA LA CANTIDAD DE ITEMS DE LA ORDEN
	const items = order.items || [];
	const { totalItems } = items.reduce(
		(acc, item) => {
			acc.totalItems += item.quantity;
			return acc;
		},
		{ totalItems: 0 }
	);

	// RENDERIZA CADA ITEMS Y MUESTRA SUS DATOS COMO TABLA
	const renderItems = (items) => {
		return items.map((item, index) => (
			<div
				key={index}
				className='flex flex-row flex-wrap items-center justify-around w-full mt-2'>
				<p className='w-5/12 text-center'>{item.name}</p>
				<p className='w-1/12 text-center'>{item.quantity}</p>
				<p className='w-3/12 text-center'>$ {item.price}</p>
				<p className='w-3/12 text-center'>$ {item.price * item.quantity}</p>
			</div>
		));
	};

	// RENDERIZA LOS ADDITIONAL CHARGES Y MUESTRA SUS DATOS EN LISTA
	const charges = order.additionalCharges || [];
	
	const renderAdditionalCharges = (charges) => {
		return charges.map((charge, index) => (
			<div
				key={index}
				className='text-xl flex flex-col flex-wrap items-center justify-center mt-4'>
				<p>Servicio de Mesa: $ {charge.tableService}</p>
				<p>Descuento: {charge.discount} % </p>
				<p>Tips: $ {charge.tips}</p>
			</div>
		));
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={onSubmit}>
					<div className='flex flex-row flex-wrap items-center justify-around'>
						<Form.Group controlId='salon'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Salon
							</Form.Label>
							<Form.Control
								className={`${
									mode === 'view' || mode === 'edit'
										? 'border-none focus:border-none focus:outline-none '
										: ''
								}`}
								type='text'
								{...register('salonName', {
									required: 'El nombre del salon es requerido',
								})}
								readOnly={mode === 'view' || mode === 'edit'}
							/>
							{errors.salonName && (
								<span className='text-warning fs-6'>
									{errors.salonName.message}
								</span>
							)}
						</Form.Group>
						<Form.Group controlId='tableNum'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Mesa
							</Form.Label>
							<Form.Control
								className={`${
									mode === 'view'
										? 'border-none focus:border-none focus:outline-none '
										: ''
								}`}
								type='number'
								{...register('tableNum', {
									required: 'El numero de mesa es requerido',
								})}
								readOnly={mode === 'view' || mode === 'edit'}
							/>
							{errors.tableNum && (
								<span className='text-warning fs-6'>
									{errors.tableNum.message}
								</span>
							)}
						</Form.Group>
					</div>
					<div className='flex flex-row flex-wrap items-center justify-around'>
						<Form.Group controlId='diners'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Personas
							</Form.Label>
							<Form.Control
								className={`${
									mode === 'view'
										? 'border-none focus:border-none focus:outline-none '
										: ''
								}`}
								type='number'
								{...register('diners', {
									required: 'La cantidad de personas es requerida',
								})}
								readOnly={mode === 'view'}></Form.Control>
							{errors.diners && (
								<span className='text-warning fs-6'>
									{errors.diners.message}
								</span>
							)}
						</Form.Group>
						<Form.Group controlId='server'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Server
							</Form.Label>
							<Form.Control
								className={`${
									mode === 'view'
										? 'border-none focus:border-none focus:outline-none '
										: ''
								}`}
								type='text'
								{...register('server', {
									required: 'El nombre del server es requerido',
								})}
								readOnly={mode === 'view' || mode === 'edit'}
							/>
							{errors.server && (
								<span className='text-warning fs-6'>
									{errors.server.message}
								</span>
							)}
						</Form.Group>
					</div>
					<div className='flex flex-row flex-wrap items-center justify-around'>
						<Form.Group controlId='openAt'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Horario Apertura{' '}
							</Form.Label>
							<Form.Control
								className={`${
									mode === 'view'
										? 'border-none focus:border-none focus:outline-none '
										: ''
								}`}
								type='text'
								{...register('openAt', {
									required: 'El horario de apertura es requerido',
								})}
								readOnly={mode === 'view' || mode === 'edit'}
							/>
							{errors.openAt && (
								<span className='text-warning fs-6'>
									{errors.openAt.message}
								</span>
							)}
						</Form.Group>
						<Form.Group controlId='closeAt'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Horario Cierre
							</Form.Label>
							<Form.Control
								className={`${
									mode === 'view'
										? 'border-none focus:border-none focus:outline-none '
										: ''
								}`}
								type='text'
								{...register('closeAt', {
									required: 'El horario de cierre es requerido',
								})}
								readOnly={
									mode === 'view' || mode === 'edit'
								}></Form.Control>
							{errors.closeAt && (
								<span className='text-warning fs-6'>
									{errors.closeAt.message}
								</span>
							)}
						</Form.Group>
					</div>
					<Form.Group controlId='items'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Items
						</Form.Label>{' '}
						{renderItems(items)}
						{renderAdditionalCharges(charges)}
						<div className=' font-semibold text-xl flex flex-col flex-wrap items-center justify-center mt-4'>
							<p>Items: {totalItems}</p>
							<p>Precio Total: $ {order.finalPrice}</p>
						</div>
					</Form.Group>
					<Form.Group
						className='flex flex-row flex-wrap items-center justify-center'
						controlId='cash'>
						<Form.Label className='mr-2 text-start bg-transparent text-xl mb-0 mt-2 text-background font-medium'>
							Forma de Pago
						</Form.Label>
						<FormSelect
							className={`${
								mode === 'view'
									? 'w-1/2 border-none focus:border-none focus:outline-none mt-3 '
									: 'w-1/2 mt-3'
							}`}
							type='text'
							{...register('orderCash', {
								required: 'La forma de pago es requerida',
							})}
							readOnly={mode === 'view'}>
							<option value='Efectivo'>Efectivo</option>
							<option value='Tarjeta Credito/Debito'>
								Tarjeta Credito/Debito
							</option>
							<option value='Pago Digital'>Pago Digital</option>
						</FormSelect>
						{errors.orderCash && (
							<span className='text-warning fs-6'>
								{errors.orderCash.message}
							</span>
						)}
					</Form.Group>
					<Form.Group className='flex flex-wrap items-center justify-around mt-3'>
						{mode !== 'view' && (
							<Button
								type='submit'
								tooltip='Confirmar'
								tooltipOptions={{ position: 'top' }}
								className='text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'>
								<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
							</Button>
						)}
						<Button
							type='button'
							tooltip='Cerrar'
							tooltipOptions={{ position: 'top' }}
							className='text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'
							onClick={onClose}>
							<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>
						</Button>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default SalesForm;
