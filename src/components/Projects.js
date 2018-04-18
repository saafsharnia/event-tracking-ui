import React, {Component} from 'react';
import ProjectsAction from '../redux/actions/ProjectsAction';
import {connect} from 'react-redux';

export default connect(state => ({
        event : state.projects
    })
)(class Events extends Component{
    componentDidMount() {
        ProjectsAction.getProjectsList();
    }

    render() {
        return(
            <div>
                Hello World Projects
            </div>
        );
    }

});

