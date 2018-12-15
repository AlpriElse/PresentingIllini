export const initialState = {
	user: '',
	courses: {
		isFetching: false,
		invalid: true,
		items: []
	},
	lectures: {
		isFetching: false,
		invalid: true,
		items: []
	},
	slides: {
		isFetching: false,
		invalid: true,
		items: null
	}
}
