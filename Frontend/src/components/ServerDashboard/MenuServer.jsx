/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import ServerLayout from './Layout/ServerLayout';
import { LoungeContext } from '../../context/LoungeContext';
import { useLayoutActions } from '../../hooks/useLayoutActions.js';

export const MenuServer = () => {
	const { state: loungeState } = useContext(LoungeContext);
	const { loadAllLayoutAction } = useLayoutActions();
	const [activeSalonId, setActiveSalonId] = useState(null);
	const [salonActive, setSalonActive] = useState({});

	// CARGA TODOS LOS SALONES GUARDADOS
	useEffect(() => {
		loadAllLayoutAction();
	}, [loungeState.lounges]);

	// SI NO HAY SALON ACTIVO. CARGA EL PRIMER SALON DEL ARRAY LOUNGES
	useEffect(() => {
		if (
			!activeSalonId &&
			loungeState.lounges &&
			loungeState.lounges.length > 0
		) {
			setActiveSalonId(loungeState.lounges[0]._id);
		}
	}, [loungeState.lounges]);

	// MANEJA LA SELECCION DEL SALON
	const handleSalonClick = (salonId) => {
		setActiveSalonId(salonId);
		const selectedLounge = loungeState.lounges.find(
			(lounge) => lounge._id === salonId
		);
		setSalonActive(selectedLounge);
	};

	const handleReload = () => {
		window.reload;
	};

	return (
		<section>
			<div className='pt-3 shadowIndex rounded-t-md bg-slate-600 flex flex-wrap flex-row justify-around'>
				{/* RENDERIZA LOS SALONES POR BOTON */}
				{loungeState.lounges && loungeState.lounges.length > 0 && (
					<div className='w-full flex flex-row flex-wrap items-center justify-around'>
						{loungeState.lounges.map((salon) => (
							<button
								key={salon._id}
								onClick={() => handleSalonClick(salon._id)}
								className={`noborder border-none text-white p-2 ${
									activeSalonId === salon._id
										? 'bg-slate-700 text-white rounded-t-lg shadowIndex'
										: 'bg-transparent text-white hover:font-bold'
								}`}>
								{salon.name}
							</button>
						))}
					</div>
				)}
			</div>
			<div className='flex w-full'>
				{activeSalonId !== null && (
					<ServerLayout
						onReload={handleReload}
						salonId={activeSalonId}
						salonName={salonActive.name}
						reload={handleReload}
					/>
				)}
			</div>
		</section>
	);
};

export default MenuServer;
