/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';

// RECIBE DATOS DE ORDERMENU (UPDATEORDER GUARDA EL MENU, CANTIDAD Y OBSERVACIONES DE CADA PEDIDO)
export const OrderCard = ({ menu, updateOrder }) => {
	const [count, setCount] = useState(0);
	const [text, setText] = useState('');

	// CON CADA INCREMENTO ACTUALIZA UPDATEORDER EN ORDERMENU
	const handleIncrement = () => {
		const newCount = count + 1;
		setCount(newCount);
		updateOrder(menu, +1, text);
	};

	// CON CADA DECREMENTO ACTUALIZA UPDATEORDER EN ORDERMENU
	const handleDecrement = () => {
		if (count > 0) {
			const newCount = count - 1;
			setCount(newCount);
			updateOrder(menu, -1, text);
		}
	};

	// ACTUALIZA EL TEXTO EN OBSERVACIONES DE CADA MENU
	const handleTextChange = (e) => {
		const newText = e.target.value;
		setText(newText);
		updateOrder(menu, 0, newText);
	};

	// MANEJA LOS BOTONES DE INC O DEC
	const footer = (
		<>
			<div className='flex flex-wrap gap-3 mt-4 flex-row justify-center'>
				<Button
					icon='pi pi-plus text-green-700'
					className='rounded-full border-2 p-2 border-green-700'
					onClick={handleIncrement}></Button>
				<span className='font-bold text-4xl '>{count}</span>
				<Button
					icon='pi pi-minus text-red-700'
					className='rounded-full border-2 p-2 border-red-700'
					onClick={handleDecrement}></Button>
			</div>
		</>
	);

	return (
		<Card className='w-[250px] h-[300px] rounded-xl border-2 border-slate-700 flex flex-col justify-between'>
			<div className='flex-grow flex flex-col justify-between w-full h-full '>
				<div className='flex flex-col font-bold text-xl w-full'>
					<h3 className='h-[50px]'>{menu.name}</h3>
					<i className='text-center text-3xl my-2 fa-solid fa-circle-info text-blue-800'></i>
				</div>

				<InputTextarea
					value={text}
					onChange={handleTextChange}
					rows={3}
					placeholder='Agregar nota'
					className='w-full flex-grow border-2 border-slate-300'
				/>
			</div>
			{footer}
		</Card>
	);
};
