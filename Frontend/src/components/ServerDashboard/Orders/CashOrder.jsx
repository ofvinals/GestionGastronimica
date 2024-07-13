/* eslint-disable react/prop-types */
import { useLayoutActions } from '../../../hooks/useLayoutActions';

export const CashOrder = ({ order, onClose, elapsedTime }) => {
	const { loadAllLayoutAction } = useLayoutActions();
	const salonName = order[0]?.salonName;
	const tableNum = order[0]?.tableNum;
	const diners = order[0]?.diners;
	const server = order[0]?.server;

	// MANEJA PAGO CON EFECTIVO. RECARGA LAYOUT
	const handleCash = () => {
		onClose();
		loadAllLayoutAction();
	};
	// MANEJA PAGO CON TARJETA CREDITO/DEBITO
	const handleCreditCard = () => {};
	// SUMA LA CANTIDAD DE ITEMS Y EL PRECIO DE TODOS LOS ITEMS DE LA ORDER
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

	return (
		<div className=''>
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
								<span className='font-semibold'>Comensales:</span>
								{diners}
							</p>
							<p className='mb-3'>
								<span className='font-semibold'>
									Tiempo de ocupacion:
								</span>{' '}
								{elapsedTime.hours} horas {elapsedTime.minutes} minutos
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
						</div>{' '}
						<div className='flex flex-col ml-5'>
							<p>Servicio de mesa: $</p>
							<span></span>
							<p>Descuento (%): </p>
							<span></span>
							<p>Tips:</p>
							<span></span>
						</div>
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
					<span className='font-normal'>$ {totalPrice.toFixed(2)}</span>
				</p>
			</div>
			<div className='flex flex-row flex-wrap items-center justify-around'>
				<button
					onClick={handleCash}
					className='border-1 rounded-md border-white text-white p-2 bg-slate-700 hover:font-bold'>
					EFECTIVO
				</button>
				<a
					href='https://link.mercadopago.com.ar/estudioposse'
					target='_blank'>
					<button className='border-1 rounded-md border-white text-white p-2 bg-slate-700 hover:font-bold'>
						MERCADO PAGO
					</button>
				</a>
				<button
					onClick={handleCreditCard}
					className='border-1 rounded-md border-white text-white p-2 bg-slate-700 hover:font-bold'>
					TARJETA{' '}
				</button>
			</div>
		</div>
	);
};
