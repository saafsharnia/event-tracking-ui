import {combineReducers} from 'redux';
import EventsReducer from './EventsReducer';
import ProjectsReducer from './ProjectsReducer';

export default combineReducers({
    events: EventsReducer,
    projects: ProjectsReducer
});
