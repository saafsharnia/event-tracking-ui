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
        case 'discardProject':
            return {
                ...state,
                data: null
            };
        default :
            return state;
    }
}