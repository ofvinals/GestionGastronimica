import { DateTime } from 'luxon';
import { useOrderActions } from './useOrderActions';
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const UPDATE_TIMER = 'UPDATE_TIMER';

export const useKitchenActions = (dispatch) => {
	const { updateOrderCooked } = useOrderActions();

	const startTimer = (orderId, itemId, openAt) => {
		const startTime = DateTime.fromISO(openAt, { zone: 'utc' }).setZone(
			'America/Argentina/Buenos_Aires'
		);
		const intervalId = setInterval(() => {
			dispatch({
				type: UPDATE_TIMER,
				payload: {
					orderId,
					itemId,
					elapsed: Date.now() - startTime.toMillis(),
				},
			});
		}, 1000);
		dispatch({
			type: START_TIMER,
			payload: {
				orderId,
				itemId,
				intervalId,
			},
		});
	};

	const stopTimer = (orderId, itemId, state) => {
		const intervalId = state.intervals[`${orderId}-${itemId}`];
		if (intervalId) {
			clearInterval(intervalId);
		}
		const cookedAt = new Date().toISOString();
		const elapsed = state.timers[`${orderId}-${itemId}`] || 0;
		dispatch({
			type: STOP_TIMER,
			payload: {
				orderId,
				itemId,
			},
		});
		updateOrderCooked(orderId, itemId, elapsed, cookedAt);
	};

	return { startTimer, stopTimer };
};
