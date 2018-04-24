import React, {Component} from 'react';
import {connect} from "react-redux";
import eventsAction from "../redux/actions/EventsAction";
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from 'material-ui/Divider';
import Projects from './Projects';

export default connect(state => ({
    events : state.events,
}))( class Event extends Component {
    state= {
        eventExpanded: false,
    };

    render() {
        const styles = this._style();
        const event = this.props.event;
        const eventId = event.id;
        const expanded = this.state.eventExpanded;
        return (
            <div key={'eventDiv-'+ eventId}>
                <ExpansionPanel key={'eventTitle-'+ eventId}
                                expanded={expanded === eventId}
                                onChange={this._generateExpansionChange(eventId)}
                                style={styles.expansionSummary}>
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
        )
    }

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

    _style() {
        return {
            expansionSummary:
                {
                    backgroundColor: this.props.currentEvent ? '#dddddd' : 'white'
                }
        }
    }
});