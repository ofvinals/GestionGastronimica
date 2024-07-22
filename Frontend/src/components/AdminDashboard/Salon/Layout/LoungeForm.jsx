/* eslint-disable react/prop-types */
import { useState } from 'react';

const LoungeForm = ({ onAddSalon, onClose }) => {
	const [newLoungeName, setNewLoungeName] = useState('');

	const handleAdd = () => {
		if (newLoungeName) {
			onAddSalon(newLoungeName);
			setNewLoungeName('');
		}
	};

	return (
		<section className='flex flex-col  items-center'>
			<h2 className='text-center text-xl my-3 font-semibold'>
				Agregar Nuevo Salón
			</h2>
			<input
				type='text'
				value={newLoungeName}
				onChange={(e) => setNewLoungeName(e.target.value)}
				placeholder='Nombre del salón'
				className='p-1 my-2'
			/>
			<div className='flex flex-row flex-wrap items-center gap-4 my-2'>
				<button
					onClick={handleAdd}
					className=' text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'>
					<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
				</button>
				<button
					onClick={onClose}
					className=' text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'>
					<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>{' '}
				</button>
			</div>
		</section>
	);
};

export default LoungeForm;
