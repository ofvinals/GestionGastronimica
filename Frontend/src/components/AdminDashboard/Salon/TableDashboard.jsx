/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import RestaurantLayout from '../../ServerDashboard/Layout/ServerLayout';
import { LoungeContext } from '../../../context/LoungeContext.jsx';
import { useLoungeActions } from '../../../hooks/useLoungeActions.jsx';
import Loader from '../../../helpers/Loader.jsx';

export const TableDashboard = ({ reload, onReload }) => {
	const { dataSalons } = useLoungeActions();
	const { state: loungeState, loading } = useContext(LoungeContext);
	const [activeSalonId, setActiveSalonId] = useState(null);

	useEffect(() => {
		dataSalons();
	}, [reload]);

	useEffect(() => {
		if (
			!activeSalonId &&
			loungeState.lounges &&
			loungeState.lounges.length > 0
		) {
			setActiveSalonId(loungeState.lounges[0]._id);
		}
	}, [loungeState.lounges]);
console.log(activeSalonId)
	const handleReload = () => {
		window.location.reload();
	};

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<RestaurantLayout
					onReload={handleReload}
					salonId={activeSalonId}
					salonName={
						loungeState.lounges.find(
							(salon) => salon._id === activeSalonId
						)?.name || 'Nombre no encontrado'
					}
				/>
			)}
		</div>
	);
};
