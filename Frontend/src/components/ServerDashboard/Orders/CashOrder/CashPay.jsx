/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useOrderActions } from '../../../../hooks/useOrderActions';
import { useLayoutActions } from '../../../../hooks/useLayoutActions';

export const CashPay = ({
	onClose,
	orderId,
	cash,
	additionalCharges,
	validFinalPrice,
}) => {
	const { updateCashOrder } = useOrderActions();
	const { loadAllLayoutAction } = useLayoutActions();
	const [paymentAmount, setPaymentAmount] = useState(0);
	const [change, setChange] = useState(0);

	const handleCons = () => {
		updateCashOrder(orderId, cash, additionalCharges, validFinalPrice);
		onClose();
		loadAllLayoutAction();
	};

	const handleFactA = () => {
		updateCashOrder(orderId, cash, additionalCharges, validFinalPrice);
		onClose();
		loadAllLayoutAction();
	};

	const handlePaymentChange = (e) => {
		const amount = parseFloat(e.target.value);
		setPaymentAmount(amount);
		calculateChange(amount);
	};

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
				<p className='text-start bg-transparent text-xl mb-0 mt-2 text-background font-medium'>{change >= 0 ? change.toFixed(2) : 'Monto insuficiente'}</p>
			</div>
			<div className='mt-5 flex flex-row flex-wrap items-center justify-around'>
				<button
					onClick={handleCons}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
					Consumidor Final
				</button>
				<button
					onClick={handleFactA}
					className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
					Factura A
				</button>
			</div>
		</div>
	);
};
