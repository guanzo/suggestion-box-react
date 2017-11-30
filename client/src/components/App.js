import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Viewer from './Viewer/Viewer'
import LiveConfig from './LiveConfig/LiveConfig'

console.log(Router)

class App extends Component {
    render() {
        return (
        <Router>
            <div className="app">
                    <Route path="*/viewer.html" component={Viewer}/>
                    <Route path="*/liveconfig.html" component={LiveConfig}/>
            </div>
        </Router>
        );
    }
}

export default App;
