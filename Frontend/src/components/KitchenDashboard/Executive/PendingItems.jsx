/* eslint-disable react/prop-types */
import { Card } from 'primereact/card';

// RECIBE PROPS DE MENUKITCHEN
export const PendingItems = ({ pendingItems }) => {
	return (
		<section className='md:w-1/4'>
			<h2 className='flex items-center justify-center text-xl h-[64px] font-semibold text-center p-2 bg-slate-700 text-white'>
				Pendientes de envio
			</h2>
			<div className='flex flex-row flex-wrap items-center justify-around'>
				{pendingItems && pendingItems.length > 0 ? (
					pendingItems.map(({ order, item }, index) => (
						<div key={index} className='m-2'>
							<Card className='w-[150px] h-[200px] rounded-xl border-2 border-slate-700 flex flex-col justify-between '>
								<div className='flex-grow flex flex-col justify-between w-full h-full'>
									<div className='flex flex-col w-full items-center justify-between text-[12px]'>
										<p className='font-bold'>Mesa {order.tableNum}</p>
										<p>Server {order.server}</p>
									</div>
									<div className='mt-3 flex flex-row text-[12px] flex-wrap items-center justify-around'>
										<p>{item.quantity}</p>
										<p>{item.name}</p>
									</div>
								</div>
							</Card>
						</div>
					))
				) : (
					<div className=''>
						<h1 className='text-slate-800 text-center my-10'>
							No hay ordenes pendientes
						</h1>
					</div>
				)}
			</div>
		</section>
	);
};
