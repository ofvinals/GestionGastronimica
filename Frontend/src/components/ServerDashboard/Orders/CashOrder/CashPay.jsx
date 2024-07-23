/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useOrderActions } from '../../../../hooks/useOrderActions.js';
import { useLayoutActions } from '../../../../hooks/useLayoutActions.js';

// RECIBE PROPS DE CASH ORDER
export const CashPay = ({
	onClose,
	orderId,
	cash,
	additionalCharges,
	validFinalPrice,
	closeTime,
	salonId,
	tableId,
	isOpen,
	index,
	openAt,
}) => {
	const { orderCashAction } = useOrderActions();
	const { updateTableIsOpenAction, loadLayoutAction  } = useLayoutActions();
	const [paymentAmount, setPaymentAmount] = useState(0);
	const [change, setChange] = useState(0);
	const orderOpen = false;

	// MANEJA LA FUNCION PARA EL PAGO CON EFECTIVO Y FACTURA C (CONSUMIDOR FINAL)
	const handleCons = () => {
		const values = {
			cash,
			additionalCharges,
			validFinalPrice,
			openAt,
			closeTime,
			orderOpen,
			receipt: 'Comsumidor Final C',
		};
		orderCashAction(orderId, values);
		updateTableIsOpenAction(
			closeTime,
			salonId,
			tableId,
			isOpen,
			index,
			openAt
		);
		loadLayoutAction(salonId)
		onClose();
	};

	// MANEJA LA FUNCION PARA EL PAGO CON EFECTIVO Y FACTURA A
	const handleFactA = () => {
		const values = {
			cash,
			additionalCharges,
			validFinalPrice,
			openAt,
			closeTime,
			orderOpen,
			receipt: 'Factura A',
		};
		orderCashAction(orderId, values);
		updateTableIsOpenAction(
			closeTime,
			salonId,
			tableId,
			isOpen,
			index,
			openAt
		);
		loadLayoutAction(salonId)
		onClose();
	};

	// MANEJA EL MONTO DE DESCUENTO
	const handlePaymentChange = (e) => {
		const amount = parseFloat(e.target.value);
		setPaymentAmount(amount);
		calculateChange(amount);
	};

	// CALCULA EL DESCUENTO SOBRE EL PRECIO FINAL
	const calculateChange = (amount) => {
		const calculatedChange = amount - validFinalPrice;
		setChange(calculatedChange);
	};

	return (
		<div>
			<Form className='flex flex-row flex-wrap items-center justify-around'>
				<label className='text-start bg-transparent text-xl mb-0 mt-2 text-background font-medium'>
					Ingrese monto de pago
				</label>
				<Form.Control
					className='w-1/3 mt-2'
					type='number'
					value={paymentAmount}
					onChange={handlePaymentChange}
				/>
			</Form>
			<div className='flex flex-row flex-wrap items-center justify-around'>
				<p className='text-start bg-transparent text-xl mb-0 mt-2 text-background font-medium'>
					Vuelto
				</p>
				<p className='text-start bg-transparent text-xl mb-0 mt-2 text-background font-medium'>
					{change >= 0 ? change.toFixed(2) : 'Monto insuficiente'}
				</p>
			</div>
			<div className='mt-5 flex flex-row flex-wrap items-center justify-around'>
				<button
					onClick={handleCons}
					className='noborder flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					Consumidor Final
				</button>
				<button
					onClick={handleFactA}
					className='noborder flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					Factura A
				</button>
			</div>
		</div>
	);
};
