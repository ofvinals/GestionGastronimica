/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AdditionalChargesForm } from './AditionalChargesForm';
import { useLayoutActions } from '../../../../hooks/useLayoutActions.js';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import Modals from '../../../../utils/Modals';
import { CashPay } from './CashPay';
import moment from 'moment';
import PaymentQR from './CashModo.jsx';

// RECIBE PROPS DE ORDERCKECK
export const CashOrder = ({
	order,
	onClose,
	tableId,
	currentLayout,
	salonId,
}) => {
	const { updateTableIsOpenAction, loadAllLayoutAction } = useLayoutActions();
	const { updateOrderAction } = useOrderActions();
	const [additionalCharges, setAdditionalCharges] = useState({
		tableService: 0,
		discount: 0,
		tips: 0,
	});
	//
	const { salonName, tableNum, diners, _id, server, openAt } = order[0];
	const [cashPay, setCashPay] = useState(false);
	const [modo, setModo] = useState(false);
	// CONFIGURA LAS PROPIEDADES PARA EL CIERRE DE MESA Y ORDER
	const closeTime = new Date().toString();
	const isOpen = false;
	const orderOpen = false;
	const index = currentLayout.findIndex((table) => table._id === tableId);
	// CALCULA EL TIEMPO DE USO DE LA MESA EN HORAS Y MINUTOS
	const duration = moment.duration(moment(closeTime).diff(moment(openAt)));
	const elapsedHours = Math.floor(duration.asHours());
	const elapsedMinutes = duration.minutes();
	const elapsedDuration = {
		hours: elapsedHours,
		minutes: elapsedMinutes,
	};

	// ABRE MODAL PARA PAGO EN EFECTIVO
	const handleCash = () => {
		setCashPay(true);
	};

	// ABRE MODAL PARA PAGO CON TARJETA CREDITO O DEBIDO
	const handleCreditCard = () => {
		const cash = 'Credito';
		const values = {
			_id,
			cash,
			orderOpen,
			additionalCharges,
			validFinalPrice,
		};
		updateOrderAction(_id, values);
		updateTableIsOpenAction(
			closeTime,
			salonId,
			tableId,
			isOpen,
			index,
			openAt
		);
		onClose();
		loadAllLayoutAction();
	};

	// ABRE MODAL PARA PAGO CON MODO (PAGO DIGITAL)
	const handleModo = () => {
		setModo(true);
	};

	// CARGA LOS ADDITIONAL CHARGES A LA ORDER FINAL
	const handleAdditionalChargesSubmit = (charges) => {
		setAdditionalCharges(charges);
	};

	// CALCULA EL SUBTOTAL DE LA ORDEN
	const { totalItems, totalPrice } = order.reduce(
		(acc, currOrder) => {
			currOrder.items.forEach((item) => {
				acc.totalItems += item.quantity;
				acc.totalPrice += item.price * item.quantity;
			});
			return acc;
		},
		{ totalItems: 0, totalPrice: 0 }
	);

	// CALCULA EL TOTAL DE LA ORDER SUMANDO SERVICIO DE MESA, TIPS Y RESTANDO DESCUENTO (%)
	const discountAmount =
		(totalPrice * (additionalCharges.discount || 0)) / 100;
	const finalPrice =
		totalPrice +
		((additionalCharges.tableService || 0) +
			(additionalCharges.tips || 0) -
			discountAmount);

	// GUARDA EL PRECIO FINAL DE LA ORDER
	const validFinalPrice = isNaN(finalPrice) ? 0 : finalPrice;

	return (
		<div>
			{order.length > 0 && (
				<>
					<div className='border-b-2 border-gray-300 pb-2 mb-2'>
						<p className='text-lg font-semibold mb-1 '>
							Salon: {salonName} - Mesa {tableNum}
						</p>
						<p className='mt-3'>
							<span className='font-semibold'>Server:</span> {server}
						</p>
						<p className=''>
							<span className='font-semibold'>Personas:</span> {diners}
						</p>
						<p className='mb-3'>
							<span className='font-semibold'>Tiempo de ocupacion:</span>{' '}
							{elapsedDuration.hours} horas {elapsedDuration.minutes}{' '}
							minutos
						</p>
						{order.map((order) => (
							<div
								className='mx-2 bg-slate-300 border-t-2 border-slate-400'
								key={order._id}>
								{order.items.map((item, itemIndex) => (
									<div key={itemIndex}>
										<p className='font-semibold border-t-2 border-slate-300'>
											{item.name}
										</p>
										<p className='text-gray-700'>
											Cantidad: {item.quantity}
										</p>
										<p className='text-gray-700'>
											Precio: ${item.price}
										</p>
										<p className='text-gray-600'>
											Observaciones: {item.text}
										</p>
									</div>
								))}
							</div>
						))}
					</div>
					<AdditionalChargesForm
						onSubmit={handleAdditionalChargesSubmit}
						totalAmount={totalPrice}
					/>
				</>
			)}

			<div className='flex flex-col flex-wrap items-center justify-between my-3 text-xl'>
				<p className='font-semibold'>
					Cantidad de items:{' '}
					<span className='font-normal'>{totalItems}</span>
				</p>
				<p className='font-bold mb-2'>
					Subtotal: <span className='font-normal'>$ {totalPrice}</span>
				</p>
				<p className='font-semibold text-lg'>
					Servicio de mesa:{' '}
					<span className='font-normal'>
						$ {additionalCharges.tableService}
					</span>
				</p>
				<p className='font-semibold text-lg'>
					Descuento:{' '}
					<span className='font-normal'>- $ {discountAmount}</span>
				</p>
				<p className='font-semibold text-lg'>
					Propina:{' '}
					<span className='font-normal'>$ {additionalCharges.tips}</span>
				</p>
				<p className=' font-extrabold'>
					Total de la Orden:{' '}
					<span className='font-semibold'>$ {validFinalPrice}</span>
				</p>
			</div>
			<hr />
			<div className='flex flex-row flex-wrap items-center justify-around'>
				<button
					onClick={handleCash}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white hover:text-white font-bold py-2 px-4 rounded'>
					EFECTIVO
				</button>
				<button
					onClick={handleModo}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white hover:text-white font-bold py-2 px-4 rounded'>
					PAGO DIGITAL (MODO)
				</button>
				<button
					onClick={handleCreditCard}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white hover:text-white font-bold py-2 px-4 rounded'>
					CREDITO/DEBITO
				</button>
			</div>

			{cashPay && (
				<Modals
					title='Generar Ticket/Factura'
					isOpen={cashPay}
					onClose={() => {
						setCashPay(false);
						onClose();
					}}>
					<CashPay
						onClose={() => {
							setCashPay(false);
							onClose();
						}}
						order={order[0]}
						orderId={_id}
						cash={'Efectivo'}
						additionalCharges={additionalCharges}
						validFinalPrice={validFinalPrice}
						closeTime={closeTime}
						salonId={salonId}
						tableId={tableId}
						isOpen={isOpen}
						index={index}
						openAt={openAt}
					/>
				</Modals>
			)}
			{modo && (
				<Modals
					title='Pagar con MODO'
					isOpen={modo}
					onClose={() => setModo(false)}>
					<PaymentQR
						orderDetails={{ amount: validFinalPrice, orderId: _id }}
					/>
				</Modals>
			)}
		</div>
	);
};
