/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import RestaurantLayout from '../Layout/RestaurantLayout';
import { LoungeContext } from '../../../../context/LoungeContext';
import { useLoungeActions } from '../../../../hooks/useLoungeActions.js';

const MenuLayout = () => {
	const { state: loungeState } = useContext(LoungeContext);
	const { dataSalons, addSalonAction, deleteSalonAction } = useLoungeActions();
	const [activeSalonId, setActiveSalonId] = useState(null);
	const [showLoungeForm, setShowLoungeForm] = useState(false);
	const [salonActive, setSalonActive] = useState({});

	useEffect(() => {
		dataSalons();
	}, []);

	useEffect(() => {
		if (loungeState.lounges.length === 0) {
			const newLoungeName = 'Salón Principal';
			addSalonAction(newLoungeName).then(() => dataSalons());
		} else {
			setActiveSalonId(loungeState.lounges[0]._id);
			setSalonActive(loungeState.lounges[0]);
		}
	}, []);

	const handleSalonClick = (salonId) => {
		setActiveSalonId(salonId);
		setShowLoungeForm(false);
		const selectedLounge = loungeState.lounges.find(
			(lounge) => lounge._id === salonId
		);
		setSalonActive(selectedLounge);
	};

	const handleOpenForm = () => {
		setShowLoungeForm(true);
	};

	const handleCloseForm = () => {
		setShowLoungeForm(false);
	};

	const handleDeleteSalon = (activeSalonId) => {
		const salonToDelete = loungeState.lounges.find(
			(lounge) => lounge._id === activeSalonId
		);
		const salonName = salonActive.name;
		deleteSalonAction(activeSalonId, salonName, salonToDelete);
	};

	return (
		<>
			<section>
				<div className='pt-3 shadowIndex rounded-t-md bg-slate-600 flex flex-wrap flex-row items-center justify-around'>
					{loungeState.lounges &&
						loungeState.lounges.map((lounge) => (
							<button
								key={lounge._id}
								onClick={() => handleSalonClick(lounge._id)}
								className={`border-none text-white p-2 ${
									activeSalonId === lounge._id
										? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
										: 'bg-transparent text-white hover:font-bold'
								}`}>
								{lounge.name}
							</button>
						))}

					<div className='flex items-end justify-end'>
						<button
							onClick={() => handleOpenForm({})}
							className='flex my-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
							<i className='pe-2 fa-solid fa-plus'></i>
							Agregar Nuevo Salon
						</button>
						<button
							onClick={() => handleDeleteSalon(activeSalonId)}
							className='ml-2 flex mb-2 items-center text-sm border border-slate-800 bg-gradient-to-b from-slate-500 to-slate-800 hover:from-slate-to-slate-800 text-white hover:text-white font-bold py-2 px-4 rounded'>
							<i className=' text-xl fa-solid fa-trash'></i>
						</button>
					</div>
				</div>
				<div className='flex w-full'>
					{activeSalonId !== null && (
						<RestaurantLayout
							salonId={activeSalonId}
							salonName={salonActive.name}
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
