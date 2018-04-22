import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Events from './components/Events';


export default class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <div>
                <Events/>
                {/*<Projects/>*/}
            </div>
        </MuiThemeProvider>
    );
  }
};
