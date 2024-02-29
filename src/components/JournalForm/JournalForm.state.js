export const INIT_STATE = {
	values: {
		title: '',
		post: '',
		date: '',
		tag: '',
	},
	valid: {
		title: true,
		post: true,
		date: true,
	},
	isFormReadyToSubmit: false,
};

export const formReducer = (state, action) => {
	switch (action.type) {
		case 'RESET_VALIDITY':
			return { ...state, valid: INIT_STATE.valid };
		case 'SUBMIT':
			const isTitleValid = !!state.values.title?.trim().length;
			const isPostValid = !!state.values.post?.trim().length;
			const isDateValid = !!state.values.date;
			return {
				...state,
				valid: {
					title: isTitleValid,
					date: isDateValid,
					post: isPostValid,
				},
				isFormReadyToSubmit: isDateValid && isPostValid && isTitleValid,
			};
		case 'CLEAR':
			return { ...INIT_STATE };
		case 'SET_VALUE':
			return { ...state, values: { ...state.values, ...action.payload } };
	}
};
