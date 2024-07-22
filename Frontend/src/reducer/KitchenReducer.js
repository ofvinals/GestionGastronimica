/* eslint-disable no-case-declarations */
const initialState = {
	timers: {},
	intervals: {},
	loading: false,
	error: null,
};

export const KitchenReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TIMER_PENDING':
			return { ...state, loading: true, error: null };
		case 'START_TIMER':
			return {
				...state,
				timers: {
					...state.timers,
					[`${action.payload.orderId}-${action.payload.itemId}`]:
						action.payload.startTime,
				},
				intervals: {
					...state.intervals,
					[`${action.payload.orderId}-${action.payload.itemId}`]:
						action.payload.intervalId,
				},
				loading: false,
	error: null,
			};
		case 'STOP_TIMER':
			const newTimers = { ...state.timers };
			const newIntervals = { ...state.intervals };

			delete newTimers[`${action.payload.orderId}-${action.payload.itemId}`];
			clearInterval(
				newIntervals[`${action.payload.orderId}-${action.payload.itemId}`]
			);
			delete newIntervals[
				`${action.payload.orderId}-${action.payload.itemId}`
			];

			return {
				...state,
				timers: newTimers,
				intervals: newIntervals,
				loading: false,
	error: null,
			};
		case 'UPDATE_TIMER':
			return {
				...state,
				timers: {
					...state.timers,
					[`${action.payload.orderId}-${action.payload.itemId}`]:
						action.payload.elapsed,
				},
				loading: false,
	error: null,
			};
		case 'TIMER_ERROR':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export { initialState };
