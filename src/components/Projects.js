import React, {Component} from 'react';
import projectsAction from '../redux/actions/ProjectsAction';
import projectDetailsAction from '../redux/actions/ProjectDetailsAction';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Tooltip from 'material-ui/Tooltip';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import eventsAction from "../redux/actions/EventsAction";

export default connect(state => ({
        projects : state.projects
    })
)(class Projects extends Component{

    state = {
        projectsByEventId : [],
        projectExpanded: false,

    };
    componentDidMount() {
        projectsAction.getProjectsList();
    }

    render() {
        const projectList = this.props.projects.data ? this.props.projects.data : [];
        const projectsByEventId = this._checkProjectsEventId(projectList);
        const expanded = this.state.projectExpanded;
        return(
            <div>
                {
                    projectsByEventId.length > 0 ?
                        <div>
                            <Tooltip title="sort list">
                                <IconButton onClick={this._sortProjects.bind(this)}>
                                    <ArrowUpward />
                                </IconButton>
                            </Tooltip>
                            {projectsByEventId.map( project => {
                                const projectId = project.id;
                                return(
                                    <ExpansionPanel key={'list'+projectId}
                                                    expanded={expanded === projectId}
                                                    onChange={this._generateExpansionChange(projectId)}>>
                                        <ExpansionPanelSummary key={'summary'+projectId}
                                                               expandIcon={<ExpandMoreIcon/>}>
                                            <Typography key={'Typography'+projectId}>
                                                {project.title}
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails key={'ExpansionPanelDetails'+projectId}>
                                            <Typography key={'Details'+projectId}>
                                                {project.short_description}
                                            </Typography>
                                        </ExpansionPanelDetails>
                                        <ExpansionPanelActions>
                                            <Button size="medium" color="primary" onClick={this._onProjectClick(project)}>
                                                Go to Project
                                            </Button>
                                        </ExpansionPanelActions>
                                    </ExpansionPanel>
                                )
                                    }

                                )

                            }
                         </div>
                        :
                        <div>
                            No Project In this event
                        </div>
                }
            </div>

        );
    }

    _checkProjectsEventId(projectList) {
        var projectsByEventId = [];
        const eventId = this.props.eventId;
        const projectListLength = projectList.length;
        for (var i=0; i<projectListLength; i++) {
            if (projectList[i].event.id === eventId) {
                projectsByEventId.push(projectList[i]);
            }

        }
        return projectsByEventId;
    }

    _generateExpansionChange(projectId) {
        return (event, expanded) => {
            this.setState({
                projectExpanded: expanded ? projectId : false,
            });
        }
    }

    _sortProjects() {
        projectsAction.sortProjects();
    }


    _onProjectClick(project) {
        return () => {
            projectDetailsAction.getDetails(project);
        }
    }



});

