import {createStore, applyMiddleware} from 'redux';
import combineReducers from '../reducers/combineReducers';

const store= createStore(
    combineReducers,
    {},
    applyMiddleware()
);

export default store;