/* eslint-disable react/prop-types */
import { useState } from 'react';
import TipButtons from '../../../../helpers/TipsButtons';

export const AdditionalChargesForm = ({ onSubmit, totalAmount }) => {
	const [tableService, setTableService] = useState('');
	const [discount, setDiscount] = useState('');
	const [tips, setTips] = useState(0);
	const [selectedTip, setSelectedTip] = useState(null);

	// CALCULA EL PORCENTAJE DE DESCUENTO SOBRE EL TOTAL DE LA ORDEN
	const handleTipsPercentage = (percentage) => {
		const calculatedTips = (totalAmount * percentage) / 100;
		setTips(calculatedTips);
	};

	// ENVIA LOS ADDITIONAL CHARGES A CASH ORDER
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			tableService: parseFloat(tableService) || 0,
			discount: parseFloat(discount) || 0,
			tips: parseFloat(tips) || 0,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-row flex-wrap w-full items-center justify-around'>
				<div className='mb-2 w-1/3 mx-2 flex flex-col'>
					<label
						className='block text-gray-700 font-bold mb-2 text-center'
						htmlFor='tableService'>
						Servicio de mesa:
					</label>
					<input
						type='number'
						id='tableService'
						value={tableService}
						onChange={(e) => setTableService(e.target.value)}
						className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						placeholder='$'
					/>
				</div>
				<div className='mb-2 w-1/3 flex flex-col '>
					<label className='block text-gray-700 font-bold mb-2 text-center'>
						Descuento (%):
					</label>
					<input
						type='number'
						id='discount'
						value={discount}
						onChange={(e) => setDiscount(e.target.value)}
						className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						placeholder='%'
					/>
				</div>
				<div className='mb-2 w-full'>
					<label className='block text-gray-700 font-bold mb-2 text-center'>
						Propina
					</label>
				</div>
				<TipButtons
					onTipSelect={handleTipsPercentage}
					selectedTip={selectedTip}
					setSelectedTip={setSelectedTip}
				/>
			</div>
			<div className='flex flex-row items-center justify-center text-center'>
				<button
					type='submit'
					className='noborder w-1/2 flex my-2 items-center text-sm border justify-center border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white  font-bold py-2 px-4 rounded'>
					Aplicar
				</button>
			</div>
			<hr className='mb-2' />
		</form>
	);
};
