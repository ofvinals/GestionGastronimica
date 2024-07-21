/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { LoungeContext } from '../../../context/LoungeContext';
import { useLayoutActions } from '../../../hooks/useLayoutActions.js';
import Loader from '../../../helpers/Loader';
import ServerLayout from '../../ServerDashboard/Layout/ServerLayout';

export const TableDashboard = () => {
	const { loadAllLayoutAction, loadLayoutAction } = useLayoutActions();
	const { state: loungeState, loading } = useContext(LoungeContext);
	const [activeSalonId, setActiveSalonId] = useState(null);

// CARGA LOS LAYOUT AL STATE
	useEffect(() => {
		loadAllLayoutAction();
	}, []);

	// ESTABLECE EL SALON ACTIVO CUANDO STATE CARGA
	useEffect(() => {
		if (
			!activeSalonId &&
			loungeState.lounges &&
			loungeState.lounges.length > 0
		) {
			setActiveSalonId(loungeState.lounges[0]._id);
		}
	}, [loungeState.lounges]);

	// Carga el layout cuando el salón activo cambia
	useEffect(() => {
		if (activeSalonId) {
			loadLayoutAction(activeSalonId);
		}
	}, [activeSalonId]);

	// MANEJA EL CAMBIO DE SALON EN LA BARRA 
	const handleSalonClick = (salonId) => {
		setActiveSalonId(salonId);
	};

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<section>
					<div className='pt-3 shadowIndex rounded-t-md bg-slate-600 flex flex-wrap flex-row items-center justify-around'>
						<h2 className='text-white text-2xl font-semibold mb-3'>
							Salones
						</h2>
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
					</div>
					{activeSalonId && (
						<ServerLayout
							salonId={activeSalonId}
							salonName={
								loungeState.lounges.find(
									(lounge) => lounge._id === activeSalonId
								)?.name
							}
						/>
					)}
				</section>
			)}
		</div>
	);
};
