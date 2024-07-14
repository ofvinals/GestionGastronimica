/* eslint-disable react/prop-types */
import { useState } from 'react';

export const AdditionalChargesForm = ({ onSubmit }) => {
	const [tableService, setTableService] = useState('');
	const [discount, setDiscount] = useState('');
	const [tips, setTips] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			tableService: tableService,
			discount: discount,
			tips: tips,
		});
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col ml-5'>
			<div className='mb-2'>
				<label
					className='block text-gray-700 font-bold mb-2'
					htmlFor='tableService'>
					Servicio de mesa:
				</label>
				<input
					type='number'
					id='tableService'
					value={tableService}
					onChange={(e) => setTableService(e.target.value)}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='$'
				/>
			</div>
			<div className='mb-2'>
				<label className='block text-gray-700 font-bold mb-2'>
					Descuento (%):
				</label>
				<input
					type='number'
					id='discount'
					value={discount}
					onChange={(e) => setDiscount(e.target.value)}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='%'
				/>
			</div>
			<div className='mb-2'>
				<label
					className='block text-gray-700 font-bold mb-2'
					htmlFor='tips'>
					Tips:
				</label>
				<input
					type='number'
					id='tips'
					value={tips}
					onChange={(e) => setTips(e.target.value)}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='$'
				/>
			</div>
			<div className='flex flex-row items-center justify-center text-center'>
				<button
					type='submit'
					className='w-1/2 flex my-2 items-center text-sm border justify-center border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
					Aplicar
				</button>
			</div>
		</form>
	);
};
