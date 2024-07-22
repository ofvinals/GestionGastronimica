/* eslint-disable react/prop-types */
export const ActionButtons = ({
	onConfirm,
	onClose,
	handlePending,
	handleCash,
	hasModifiedItems,
}) => (
	<div className='flex flex-wrap items-center justify-around mt-3'>
		<button
			onClick={onConfirm}
			className='noborder text-white p-2 rounded-full hover:bg-blue-800 hover:text-blue-800'>
			<i className='fa-solid fa-circle-plus text-[40px] text-blue-800 hover:text-white'></i>
		</button>
		{hasModifiedItems ? (
			<button
				onClick={handlePending}
				className='noborder text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'>
				<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
			</button>
		) : null}
		<button
			type='button'
			className='noborder text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'
			onClick={onClose}>
			<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>
		</button>
		<button
			type='button'
			className='noborder text-white p-2 rounded-full hover:bg-slate-800 hover:text-slate-800'
			onClick={handleCash}>
			<i className='fa-solid fa-cash-register text-[40px] text-slate-800 hover:text-white'></i>
		</button>
	</div>
);
