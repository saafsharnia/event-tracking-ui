import React, {Component} from 'react';
import eventsAction from '../redux/actions/EventsAction';
import {connect} from 'react-redux';
import Card, {CardHeader} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Tooltip from 'material-ui/Tooltip';
import Event from './Event'

export default connect(state => ({
    events : state.events,
}))(class EventsList extends Component{
    state = {
        eventExpanded: false,
        currentEvent: false
    };

    componentDidMount() {
        eventsAction.getEventsList();
        eventsAction.getCurrentEvent();
    }

    render() {
        const events = this.props.events.data ? this.props.events.data : [];
        const styles = this._styles();
        const expanded = this.state.eventExpanded;
        const currentEventId = this.props.events.currentEvent ? this.props.events.currentEvent.id : {};
        return(
            <Card style={styles.eventsListCard}>
                <CardHeader title='Events' style={styles.eventListCardHeader}
                            action={
                                <Tooltip title="sort list">
                                    <IconButton onClick={this._sortEvents.bind(this)}>
                                        <ArrowDownward />
                                    </IconButton>
                                </Tooltip>
                            }/>
                <div>
                    {events.map(event => {
                        const eventId = event.id;
                        var currentEvent = false;
                        if(eventId===currentEventId) {
                            currentEvent = true;
                        }
                        return (
                            <Event event={event} currentEvent={eventId===currentEventId}/>
                        );
                    })}
                </div>
            </Card>

        );
    }

    // _eventExpandIsOpen(){
    //     this.setState({EventExpandIsOpen: true});
    // }

    // _generateExpansionChange(eventId) {
    //     function expansionChange(event, expanded) {
    //         this.setState({
    //             expanded: expanded ? eventId : false,
    //         });
    //     }
    //
    //     return expansionChange;
    // }

    _generateExpansionChange(eventId) {
        return (event, expanded) => {
            this.setState({
                eventExpanded: expanded ? eventId : false,
            });
        }
   }

   _sortEvents() {
        eventsAction.sortEvents();
   }


    _styles () {
        return({
            eventsListCard: {
                width: '50%',
                marginTop: '5%',
                marginLeft: '25%',
            },
            eventListCardHeader: {
                width: '80%',
                marginLeft: '5%'
            },
            currentEvent: {
                backgroundColor: 'white'
            }
        });
    }
});

