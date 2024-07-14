/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import RestaurantLayout from './Layout/ServerLayout.jsx';
import { LoungeContext } from '../../context/LoungeContext.jsx';
import { useLoungeActions } from '../../hooks/useLoungeActions.jsx';

export const MenuServer = ({ reload }) => {
	const { state: loungeState } = useContext(LoungeContext);
	const { dataSalons } = useLoungeActions();
	const [activeSalonId, setActiveSalonId] = useState(null);

	// CARGA TODOS LOS SALONES GUARDADOS
	useEffect(() => {
		dataSalons();
	}, [reload]);

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
	};

	// RECARGA LA PAGINA
	const handleReload = () => {
		window.location.reload();
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
								className={`border-none text-white p-2 ${
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
					<RestaurantLayout
						onReload={handleReload}
						salonId={activeSalonId}
						salonName={
							loungeState.lounges.find(
								(salon) => salon._id === activeSalonId
							)?.name || 'Nombre de salon no encontrado'
						}
					/>
				)}
			</div>
		</section>
	);
};

export default MenuServer;
