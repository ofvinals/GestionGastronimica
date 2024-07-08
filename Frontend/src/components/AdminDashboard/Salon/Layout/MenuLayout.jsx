/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import RestaurantLayout from '../Layout/RestaurantLayout';
import { LoungeContext } from '../../../../context/LoungeContext.jsx';
import { useLoungeActions } from '../../../../hooks/useLoungeActions.jsx';

const MenuLayout = () => {
	const { state: loungeState } = useContext(LoungeContext);
	const { dataSalons } = useLoungeActions();
	const [activeSalonId, setActiveSalonId] = useState(null);
	const [showLoungeForm, setShowLoungeForm] = useState(false);
	const [salonActive, setSalonActive] = useState([]);

	useEffect(() => {
		dataSalons();
	}, []);

	useEffect(() => {
		if (loungeState.lounges.length > 0) {
			setActiveSalonId(loungeState.lounges[0]._id);
			setSalonActive(loungeState.lounges[0]);
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
					<button
						onClick={() => handleSalonClick(salonActive._id)}
						className={`border-none text-white p-2 ${
							activeSalonId === salonActive._id
								? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
								: 'bg-transparent text-white hover:font-bold'
						}`}>
						{salonActive.name}
					</button>

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
