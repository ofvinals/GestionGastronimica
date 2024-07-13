/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { useCounter } from 'primereact/hooks';
import { CategorySelection } from './CategorySelection';
import { OrderMenu } from './OrderMenu';
import Modals from '../../Modals';
import { OrderResume } from './OrderResume';
import { useOrderActions } from '../../../hooks/useOrderActions';
import { useLayoutActions } from '../../../hooks/useLayoutActions';
import { OrderContext } from '../../../context/OrderContext';
import { AuthContext } from '../../../context/AuthContext';

// RECIBE DATOS DE RESTAURANTLAYOUT
export const OrderForm = ({
	salonName,
	salonId,
	tableNum,
	onReload,
	tableId,
	currentLayout,
	setOpenLayout,
	setOrderForm,
}) => {
	const { count, increment, decrement } = useCounter(0);
	const { deleteOrderPrevAction } = useOrderActions();
	const { updateTableIsOpenAction } = useLayoutActions();
	const { state: prevOrder } = useContext(OrderContext);
	const { state: serverState } = useContext(AuthContext);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [confirmComanda, setConfirmComanda] = useState(null);
	const server = serverState.user.displayName;
	
	// RECIBE LA CATEGORIA SELECCIONADA EN CATEGORYSELECTION
	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
	};

	// ABRE RESUMEN DE COMANDA P CONFIRMAR Y ENVIAR A COCINA
	const handleComanda = () => {
		setConfirmComanda(true);
	};

	// CIERRA RESUMEN DE COMANDA
	const handleCloseModal = () => {
		setConfirmComanda(null);
	};

	// CIERRA MESA (ISOPEN FALSE) Y BORRA PREVORDER DEL REDUCER. VUELVE AL LAYOUT
	const handleDelete = async () => {
		try {
			const isOpen = false;
			const index = currentLayout.findIndex(
				(table) => table._id === tableId
			);
			// ACTUALIZA ESTADO DE LA MESA
			updateTableIsOpenAction(salonId, tableId, isOpen, index);
			if (prevOrder.prevOrder && prevOrder.prevOrder.length > 0) {
				// BORRAR PREVORDER DE REDUCER
				await deleteOrderPrevAction(prevOrder.prevOrder[0].tableId);
			} else {
				console.error('No hay ordenes previas para eliminar');
			}
			// CIERRA EL FORM Y ABRE LAYOUT
			setOrderForm(false);
			setOpenLayout(true);
		} catch (error) {
			console.error('Error al eliminar la orden:', error);
		}
	};

	return (
		<>
			<div className='text-center w-full flex flex-wrap flex-col my-5 items-center justify-center gap-3'>
				<h1 className='text-3xl font-semibold my-2'>
					Comanda Mesa Nº {tableNum} - Salon: {salonName}
				</h1>
				<div className='flex flex-row items-center justify-center w-full'>
					<div className='card flex flex-col items-center justify-center my-2 mx-2 p-2 w-[250px] h-full rounded-xl border-slate-700'>
						<h2 className='text-2xl font-semibold my-2'>
							Cantidad de personas
						</h2>
						<span className='font-bold text-4xl my-3'>{count}</span>
						<div className='flex flex-wrap flex-row items-center gap-4 justify-around my-3'>
							<Button
								icon='pi pi-plus text-green-700'
								className='rounded-full border-2 p-2  border-green-700'
								onClick={increment}></Button>
							<Button
								icon='pi pi-minus text-red-700'
								className='rounded-full p-2 border-2 border-red-700'
								onClick={decrement}></Button>
						</div>
					</div>
					<div className='w-full flex flex-row flex-wrap items-center justify-center'>
						<div className='flex flex-col flex-wrap items-center border-1 mx-4 px-2 rounded-xl bg-white border-slate-800 w-full'>
							<h2 className='text-xl font-semibold mt-2'>
								Categorias del Menu
							</h2>
							<CategorySelection
								onCategorySelect={handleCategorySelect}
							/>
						</div>
						<div className='flex flex-row flex-wrap items-center justify-around'>
							<button
								onClick={handleComanda}
								className='mx-1 my-3 w-[50%] text-xl border-2 font-semibold border-green-100 p-2 bg-green-700 hover:text-green-700 hover:border-green-700 text-slate-50 hover:bg-white rounded-md'>
								VERIFICAR Y CONFIRMAR COMANDA
							</button>
							<button
								onClick={handleDelete}
								className='mx-1 my-3 w-1/3 text-xl border-2 font-semibold border-green-100 p-2 bg-red-700 hover:text-red-700 hover:border-red-700 text-slate-50 hover:bg-white rounded-md'>
								CANCELAR COMANDA
							</button>
						</div>
					</div>
				</div>
				<div>
					<h2 className='my-4 text-2xl font-semibold'>Menu</h2>
					<OrderMenu
						selectedCategory={selectedCategory}
						tableNum={tableNum}
						tableId={tableId}
						salonName={salonName}
						diners={count}
						server={server}
					/>
				</div>
			</div>
			{confirmComanda && (
				<Modals
					isOpen={true}
					onClose={handleCloseModal}
					title='Confirmar Comanda'>
					<OrderResume
						setOpenLayout={setOpenLayout}
						setOrderForm={setOrderForm}
						onClose={handleCloseModal}
						onReload={onReload}
					/>
				</Modals>
			)}
		</>
	);
};
