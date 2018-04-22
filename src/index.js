import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store/store';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import {Route, Router, BrowserRouter} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {syncHistoryWithStore} from 'react-router-redux';
import { createBrowserHistory } from 'history';

const history = syncHistoryWithStore(createBrowserHistory(), store);
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
        <Route path="/" component={App}>
        </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);