import React, { Component } from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Events from './components/EventsList';
import ProjectDeatails from './components/ProjectDetails';

export default connect(state => ({
    projectDetails: state.projectDetails
}))(class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <div>

                {this.props.projectDetails.data ?
                    <ProjectDeatails/>
                       :
                    <Events/>}
            </div>
        </MuiThemeProvider>
    );
  }
});
