import React, {Component} from 'react';
import projectsAction from '../redux/actions/ProjectsAction';
import {connect} from 'react-redux';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';



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
                                                <Button size="medium" color="primary">
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
                        </div>
                }
            </div>

        );
    }

    _checkProjectsEventId(projectList) {
        var projectsByEventId = [];
        var i=0;
        var j=0;
        const eventId = this.props.eventId;
        // console.log('projectList=',projectList);
        const projectListLength = projectList.length;
        for (i; i<projectListLength; i++) {
            if (projectList[i].event.id === eventId) {
                projectsByEventId.push(projectList[i]);
                // console.log('projectsByEventIdin for loop==', projectsByEventId);

                j++;
            }

        }
        // console.log('projectsByEventId==',projectsByEventId);
        return projectsByEventId;
    }

    _generateExpansionChange(projectId) {
        return (event, expanded) => {
            this.setState({
                projectExpanded: expanded ? projectId : false,
            });
        }
    }



});

