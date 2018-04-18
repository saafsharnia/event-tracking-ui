export default function ProjectsReducer(state = {data:'' , error:''}, action) {
    switch (action.type) {
        case 'ProjectsList':
            return {
                ...state,
                data: action.data
            };
        case 'ProjectsError':
            return {
                ...state,
                error: 'Somethings went wrong. Try again later'
            };
        default:
            return state;
    }
}