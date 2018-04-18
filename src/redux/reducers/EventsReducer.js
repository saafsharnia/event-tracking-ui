export default function EventReducer(state = {data:'' , error:''}, action) {
    switch (action.type) {
        case 'EventsList':
            return {
                ...state,
                data: action.data
            };
        case 'EventsError':
            return {
                ...state,
                error: 'Somethings went wrong. Try again later'
            };
        default:
            return state;
    }
}