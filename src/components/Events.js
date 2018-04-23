import React, {Component} from 'react';
import eventsAction from '../redux/actions/EventsAction';
import {connect} from 'react-redux';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from 'material-ui/Divider';
import Card, {CardHeader} from 'material-ui/Card';
import Projects from './Projects';
import IconButton from 'material-ui/IconButton';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Tooltip from 'material-ui/Tooltip';

export default connect(state => ({
    events : state.events,
}))(class Events extends Component{
    state = {
        eventExpanded: false,
    };

    componentDidMount() {
        eventsAction.getEventsList();
    }

    render() {
        const events = this.props.events.data ? this.props.events.data : [];
        const styles = this._styles();
        const expanded = this.state.eventExpanded;
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
                        return (
                            <div key={'eventDiv-'+ eventId}>
                                <ExpansionPanel key={'eventTitle-'+ eventId}
                                                expanded={expanded === eventId}
                                                onChange={this._generateExpansionChange(eventId)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography>
                                            {event.title}
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Projects eventId={eventId} />
                                        <Divider key={'eventDivider-'+ eventId} />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
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
            }
        });
    }
});

