export default function ProjectDetailsReducer(state = {data: null}, action) {
    switch (action.type) {
        case 'CatchProjectDetails':
            return {
                ...state,
                data: action.data
            };
        case 'GetRidOfDetails':
            return {
                ...state,
                data: false
            };
        default :
            return state;
    }
}