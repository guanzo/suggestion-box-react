import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Viewer from './Viewer/Viewer'
import LiveConfig from './LiveConfig/LiveConfig'
import Config from './Config/Config'

class App extends Component {
    render() {
        return (
        <Router>
            <div className="app">
                <Route path="*/viewer.html" component={Viewer}/>
                <Route path="*/liveconfig.html" component={LiveConfig}/>
                <Route path="*/config.html" component={Config}/>
            </div>
        </Router>
        );
    }
}

export default App;
