import React, {Component} from 'react';
import eventsAction from '../redux/actions/EventsAction';
import {connect} from 'react-redux';
import Card, {CardHeader} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Tooltip from 'material-ui/Tooltip';
import Event from './Event'

export default connect(state => ({
    events : state.events,
}))(class EventsList extends Component{
    state = {
        eventExpanded: false,
        currentEvent: false,
        wishSort: 'Ascending sort'
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
                                <Tooltip title={this.state.wishSort}>
                                    <IconButton onClick={this._sortEvents.bind(this)}>
                                        {
                                            this.state.wishSort == 'Ascending sort' ?
                                                <ArrowDownward />
                                                :
                                                <ArrowUpward/>
                                        }
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
                            <Event
                                key={'Event'+eventId}
                                event={event}
                                currentEvent={eventId===currentEventId}/>
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
        if(this.state.wishSort === 'Ascending sort')
        {
            eventsAction.sortEvents('Ascending sort');
            this.setState({wishSort: 'Descending sort'});
        }
        else {
            eventsAction.sortEvents('Descending sort');
            this.setState({wishSort: 'Ascending sort'});
        }

   }


    _styles () {
        return({
            eventsListCard: {
                width: window.screen.width > 600 ? '50%' : '100%',
                marginTop: window.screen.width > 600 ? '5%' : 0,
                marginLeft: window.screen.width > 600 ? '25%' : 0,
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

