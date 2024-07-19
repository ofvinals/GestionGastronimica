/* eslint-disable react/prop-types */
export const OrderItems = ({
	orders,
	handleCheckboxChange,
	handleDeleteItem,
}) => (
	<>
		{orders.map((order) => (
			<div key={order._id}>
				{order.items.map((item) => (
					<div
						key={item._id}
						className={
							item.pending
								? ' mx-2 border-t-2 border-slate-400'
								: ' mx-2 bg-slate-300 border-t-2 border-slate-400'
						}>
						<p className='font-semibold border-t-2 ml-2 border-slate-300'>
							{item.name}
						</p>
						<p className='text-gray-700 ml-2'>
							Cantidad: {item.quantity}
						</p>
						<p className='text-gray-600 ml-2'>
							Observaciones: {item.text}
						</p>
						{item.pending ? (
							<div className='flex flex-row flex-wrap items-center justify-around'>
								<div className='ml-4 mt-2'>
									<label className='inline-flex items-center'>
										<input
											type='checkbox'
											className='h-5 w-5 text-green-600 bg-green-500'
											checked={item.pending}
											onChange={() =>
												handleCheckboxChange(order._id, item._id)
											}
										/>
										<span className='ml-2 text-gray-700 font-semibold'>
											Pendiente
										</span>
									</label>
								</div>
								<button
									onClick={() =>
										handleDeleteItem(order._id, item._id)
									}>
									<i className='fa-solid fa-trash-can rounded-full p-2 border-2 mb-1 border-red-700 text-red-700 hover:bg-red-700 hover:text-red-100'></i>
								</button>
							</div>
						) : (
							<div className='flex flex-row flex-wrap items-center justify-between'>
								<span className='ml-4 text-gray-900 font-bold'>
									Confirmado
								</span>
								<div className='ml-4 text-gray-900 font-bold mr-5'>
									{item.cookedAt ? (
										<span>
											<i className='fa-solid fa-circle text-sm  text-green-800'></i>
											Elaborado
										</span>
									) : (
										<span>
											<i className='fa-solid fa-circle text-sm text-yellow-600'></i>
											En preparacion
										</span>
									)}
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		))}
	</>
);

export default OrderItems;
