import { useState } from 'react';
import '../../../css/Custom.css';
import { SaleMenu } from './sales/SaleMenu';
import 'react-datepicker/dist/react-datepicker.css';
import { BillMenu } from './bills/BillMenu';
import { BalanceMenu } from './balance/BalanceMenu';

export const CashMenu = () => {
	const [activeButton, setActiveButton] = useState('sale');
	const [activeComponent, setActiveComponent] = useState('sale');

	const renderComponent = () => {
		switch (activeComponent) {
			case 'sale':
				return <SaleMenu />;
			case 'bills':
				return <BillMenu />;
			case 'balance':
				return <BalanceMenu />;
			default:
				return null;
		}
	};

	return (
		<section>
			<div className='px-5 shadowIndex w-full rounded-t-md bg-slate-700 flex flex-wrap flex-row items-center justify-around sm:justify-between drop-shadow-3xl'>
				<div className='w-fit my-3 '>
					<h3 className=' text-white text-xl font-semibold'>
						Estado de Caja
					</h3>
				</div>
				<div className='flex flex-wrap w-2/3 flex-row items-center justify-around m-3'>
					<button
						onClick={() => {
							setActiveComponent('sale'), setActiveButton('sale');
						}}
						className={`flex my-2 items-center text-sm font-bold py-2 px-4 rounded ${
							activeButton === 'sale'
								? 'border-slate-500 border-2 bg-slate-300  text-slate-600 font-bold'
								: 'border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white shadowIndex font-bold'
						}`}>
						Ventas
					</button>
					<button
						onClick={() => {
							setActiveComponent('bills'), setActiveButton('bills');
						}}
						className={`flex my-2 items-center text-sm font-bold py-2 px-4 rounded ${
							activeButton === 'bills'
								? 'border-slate-200 border-2 bg-slate-300  text-slate-600 font-bold'
								: 'border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white shadowIndex font-bold'
						}`}>
						Gastos
					</button>
					<button
						onClick={() => {
							setActiveComponent('balance');
							setActiveButton('balance');
						}}
						className={`flex my-2 items-center text-sm font-bold py-2 px-4 rounded ${
							activeButton === 'balance'
								? 'border-slate-200 border-2 bg-slate-300  text-slate-600 font-bold'
								: 'border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-500 text-white shadowIndex font-bold'
						}`}>
						Balance
					</button>
				</div>
			</div>
			<div className='w-full'>{renderComponent()}</div>
		</section>
	);
};
