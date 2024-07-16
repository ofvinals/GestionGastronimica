/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
const initialState = {
	timers: {},
	intervals: {},
	loading: false,
	error: null,
};

export const KitchenReducer = (state = initialState, action) => {
	console.log(state, action);
	switch (action.type) {
		case 'TIMER_PENDING':
			return { ...state, loading: true, error: null };
		case 'START_TIMER':
			return {
				...state,
				intervals: {
					...state.intervals,
					[`${action.payload.orderId}-${action.payload.itemId}`]:
						action.payload.intervalId,
				},
			};
		case 'STOP_TIMER':
			const {
				[`${action.payload.orderId}-${action.payload.itemId}`]: _,
				...restIntervals
			} = state.intervals;
			return {
				...state,
				intervals: restIntervals,
				timers: {
					...state.timers,
					[`${action.payload.orderId}-${action.payload.itemId}`]: 0,
				},
			};
		case 'UPDATE_TIMER':
			return {
				...state,
				timers: {
					...state.timers,
					[`${action.payload.orderId}-${action.payload.itemId}`]:
						action.payload.elapsed,
				},
			};
		case 'TIMER_ERROR':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export { initialState };
