import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Viewer from './page-viewer/Viewer'
import LiveConfig from './page-liveconfig/LiveConfig'
import Config from './page-config/Config'
import './App.scss';


class App extends Component {
    constructor(){
        super()
    }
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
