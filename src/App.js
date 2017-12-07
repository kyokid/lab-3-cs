import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TabList, Tab } from './Tabs';
import { withGithub } from './GithubApi';
import Homepage from './Homepage';
const { clientId } = require('./env.json')

class App extends Component {
  render() {
    const WrappedHomePage = withGithub(Homepage, clientId)
    return (
      <WrappedHomePage />
    )
  }
}

export default App;
