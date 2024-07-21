/* eslint-disable react/prop-types */

// FORMULARIO DEL MODAL. RECIBE PROPS DE SERVERLAYOUT. DEVUELVE ONCONFIRM
export const TableOpenForm = ({ table, onConfirm, onClose }) => {
	// comprobar que la mesa este habilitada para el server usuario o para todos
	return (
		<div>
			<p className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
				¿Desea abrir la mesa {table && table.id}?
			</p>
			<div className='flex flex-wrap items-center justify-around mt-3'>
				<button
					className='text-white p-2 rounded-full hover:bg-green-800 hover:text-green-800'
					onClick={() => onConfirm(null)}>
					<i className='fa-solid fa-circle-check text-[40px] text-green-800 hover:text-white'></i>
				</button>
				<button
					type='button'
					className='text-white p-2 rounded-full hover:bg-red-800 hover:text-red-800'
					onClick={onClose}>
					<i className='fa-solid fa-circle-xmark text-[40px] text-red-800 hover:text-white'></i>
				</button>
			</div>
		</div>
	);
};
