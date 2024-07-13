/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../../../context/OrderContext.jsx';
import { useForm } from 'react-hook-form';
import { useOrderActions } from '../../../../hooks/useOrderActions.jsx';
import Loader from '../../../../helpers/Loader.jsx';
import { Form } from 'react-bootstrap';
import { DateTime } from 'luxon';

const OrderForm = ({ rowId, onClose, mode = 'edit' }) => {
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
				openAt: values.openAt,
				closeAt: values.closeAt,
				items: values.items,
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
	// CALCULA LA CANTIDAD DE ITEMS DE LA ORDEN Y EL PRECIO TOTAL
	const items = order.items || [];
	const { totalItems, totalPrice } = items.reduce(
		(acc, item) => {
			acc.totalItems += item.quantity;
			acc.totalPrice += item.price * item.quantity;
			return acc;
		},
		{ totalItems: 0, totalPrice: 0 }
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
								type='text'
								{...register('salonName', {
									required: 'La fecha es requerida',
								})}
								readOnly={mode === 'view'}
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
								type='number'
								{...register('tableNum', {
									required: 'El concepto es requerido',
								})}
								readOnly={mode === 'view'}
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
								type='number'
								{...register('diners', {
									required: 'El tipo es requerido',
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
								type='text'
								{...register('server', {
									required: 'El monto del gasto es requerido',
								})}
								readOnly={mode === 'view'}
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
								type='text'
								{...register('openAt', {
									required: 'El monto del gasto es requerido',
								})}
								readOnly={mode === 'view'}
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
								type='text'
								{...register('closeAt', {
									required: 'El estado es requerido',
								})}
								readOnly={mode === 'view'}></Form.Control>
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
						</Form.Label>
						{renderItems(items)}
						<div className=' font-semibold text-xl flex flex-col flex-wrap items-center justify-center mt-4'>
							<p>Items: {totalItems}</p>
							<p>Precio Total: $ {totalPrice}</p>
						</div>
					</Form.Group>
					<Form.Group className='flex flex-wrap items-center justify-around mt-3'>
						{mode !== 'view' && (
							<button
								type='submit'
								className='text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'>
								<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
							</button>
						)}
						<button
							type='button'
							className='text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'
							onClick={onClose}>
							<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>
						</button>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default OrderForm;
