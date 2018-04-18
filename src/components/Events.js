import React, {Component} from 'react';
import EventsAction from '../redux/actions/EventsAction';
import {connect} from 'react-redux';

export default connect(state => ({
    event : state.events
    })
)(class Events extends Component{
    componentDidMount() {
        EventsAction.getEventsList();
    }

    render() {
        return(
            <div>
                Hello World
            </div>
        );
    }

});

