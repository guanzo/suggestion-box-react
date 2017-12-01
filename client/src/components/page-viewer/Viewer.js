import React, { Component } from 'react';
import Header from './header/Header'
import Body from './body/Body'
import './Viewer.scss';

class Viewer extends Component {
    render() {
        return (
        <div class="viewer">
            <Header></Header>
            <Body></Body>
        </div>
        );
    }
}



export default Viewer;
