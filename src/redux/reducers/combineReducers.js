import {combineReducers} from 'redux';
import EventsReducer from './EventsReducer';
import ProjectsReducer from './ProjectsReducer';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    events: EventsReducer,
    projects: ProjectsReducer,
    routing: routerReducer
});
