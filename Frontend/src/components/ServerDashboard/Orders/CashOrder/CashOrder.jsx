/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AdditionalChargesForm } from './AditionalChargesForm';
import { useLayoutActions } from '../../../../hooks/useLayoutActions';
import { useOrderActions } from '../../../../hooks/useOrderActions';
import Modals from '../../../Modals';
import { CashPay } from './CashPay';

export const CashOrder = ({ order, onClose, elapsedDuration }) => {
	const { loadAllLayoutAction } = useLayoutActions();
	const { updateCashOrder } = useOrderActions();
	const [additionalCharges, setAdditionalCharges] = useState({
		tableService: 0,
		discount: 0,
		tips: 0,
	});
	const [cashPay, setCashPay] = useState(false);
	const salonName = order[0]?.salonName;
	const tableNum = order[0]?.tableNum;
	const diners = order[0]?.diners;
	const orderId = order[0]?._id;
	const server = order[0]?.server;
	
	const handleCash = () => {
		setCashPay(true);
	};

	const handleCreditCard = () => {
		const cash = 'Credito';
		updateCashOrder(orderId, cash, additionalCharges, validFinalPrice);
		onClose();
		loadAllLayoutAction();
	};

	const handleAdditionalChargesSubmit = (charges) => {
		setAdditionalCharges(charges);
	};

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

	const finalPrice =
		totalPrice +
		((additionalCharges?.tableService ?? 0) +
			(additionalCharges?.tips ?? 0) -
			(totalPrice * (additionalCharges?.discount ?? 0)) / 100);

	const validFinalPrice = isNaN(finalPrice) ? 0 : finalPrice;

	return (
		<div>
			<>
				{order.length > 0 && (
					<>
						<div className='border-b-2 border-gray-300 pb-2 mb-2'>
							<p className='text-lg font-semibold mb-1 '>
								{salonName} - Mesa {tableNum}
							</p>
							<p className='mt-3'>
								<span className='font-semibold'>Server:</span> {server}
							</p>
							<p className='mb-3'>
								<span className='font-semibold'>Comensales:</span>{' '}
								{diners}
							</p>
							<p className='mb-3'>
								<span className='font-semibold'>
									Tiempo de ocupacion:
								</span>{' '}
								{elapsedDuration.hours} horas {elapsedDuration.minutes}{' '}
								minutos
							</p>
							{order.map((order) => (
								<div
									className=' mx-2 bg-slate-300 border-t-2 border-slate-400'
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
						/>
					</>
				)}
			</>
			
			<div className='flex flex-col flex-wrap items-center justify-between my-3 text-xl'>
				<p className='font-semibold'>
					Cantidad de items:{' '}
					<span className='font-normal'>{totalItems}</span>
				</p>
				<p className='font-semibold'>
					Total de la Orden:{' '}
					<span className='font-normal'>
						$ {validFinalPrice.toFixed(2)}
					</span>
				</p>
			</div>
			<div className='flex flex-row flex-wrap items-center justify-around'>
				<button
					onClick={handleCash}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
					EFECTIVO
				</button>
				<a
					href='https://link.mercadopago.com.ar/estudioposse'
					target='_blank'>
					<button className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
						MERCADO PAGO
					</button>
				</a>
				<button
					onClick={handleCreditCard}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
					TARJETA{' '}
				</button>
			</div>

			{cashPay && (
				<Modals
					title='Generar Ticket/Factura'
					isOpen={cashPay}
					onClose={onClose}>
					<CashPay
						onClose={onClose}
						order={order[0]}
						orderId={orderId}
						cash={'Efectivo'}
						additionalCharges={additionalCharges}
						validFinalPrice={validFinalPrice}
					/>
				</Modals>
			)}
		</div>
	);
};
