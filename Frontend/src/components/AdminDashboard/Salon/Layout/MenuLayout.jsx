/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import RestaurantLayout from '../Layout/RestaurantLayout';
import { LoungeContext } from '../../../../context/LoungeContext.jsx';
import { useLoungeActions } from '../../../../hooks/useLoungeActions.jsx';

const MenuLayout = () => {
	const [activeSalonId, setActiveSalonId] = useState(null);
	const [showLoungeForm, setShowLoungeForm] = useState(false);
	const { state } = useContext(LoungeContext);
	const { dataSalons } = useLoungeActions();

	useEffect(() => {
		dataSalons();
	}, []);

	useEffect(() => {
		if (state.lounges.length > 0) {
			setActiveSalonId(state.lounges[0]._id);
		}
	}, []);

	const handleSalonClick = (salonId) => {
		setActiveSalonId(salonId);
		setShowLoungeForm(false); 
	};

	const handleOpenForm = () => {
		setShowLoungeForm(true);
	};

	const handleCloseForm = () => {
		setShowLoungeForm(false);
	};

	return (
		<>
			<section>
				<div className='pt-3 shadowIndex rounded-t-md bg-slate-600 flex flex-wrap flex-row items-center justify-around'>
					{state.lounges.map((salon) => (
						<button
							key={salon._id}
							onClick={() => handleSalonClick(salon._id)}
							className={`border-none text-white p-2 ${
								activeSalonId === salon._id
									? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
									: 'bg-transparent text-white hover:font-bold'
							}`}>
							{salon.name}
						</button>
					))}
					<div className='flex items-end justify-end'>
						<button
							onClick={(e) =>
								handleOpenForm({
									x: e.clientX,
									y: e.clientY,
								})
							}
							className='mx-3 my-3 border-1 border-white p-1 bg-slate-600 hover:text-slate-600 text-slate-50 hover:bg-white rounded-md'>
							<i className='pe-2 fa-solid fa-user-plus'></i>
							Agregar Nuevo Salon
						</button>
					</div>
				</div>
				<div className='flex w-full'>
					{activeSalonId !== null && (
						<RestaurantLayout
							salonId={activeSalonId}
							salonName={
								state.lounges.find(salon => salon._id === activeSalonId)?.name || 'Nombre no encontrado'

							}
							showLoungeForm={showLoungeForm}
							onCloseForm={handleCloseForm}
						/>
					)}
				</div>
			</section>
		</>
	);
};

export default MenuLayout;
