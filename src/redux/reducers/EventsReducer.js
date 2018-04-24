export default function EventReducer(state = {data: '' ,currentEvent:'', error: ''}, action) {
    switch (action.type) {
        case 'EventsList':
            return {
                ...state,
                data: action.data
            };
        case 'EventsError':
            return {
                ...state,
                error: action.data + 'Somethings went wrong. Try again later'
            };
        case  'CurrentEvent':
            return{
                ...state,
                currentEvent: action.data
            };
        default:
            return state;
    }
}