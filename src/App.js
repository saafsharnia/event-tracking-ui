import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

export default class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
          <div className="App-header">
              Hello World!
          </div>
        </MuiThemeProvider>
    );
  }
};
