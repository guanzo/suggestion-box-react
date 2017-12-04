import React, { Component } from 'react';
import Header from './header/Header'
import Body from './body/Body'
import './Viewer.scss';
import Overlay from '@/components/page-viewer/suggest/_Overlay'

class Viewer extends Component {
    render() {
        return (
        <div class='viewer'>
            <Header></Header>
            <Body></Body>
            <Overlay></Overlay>
        </div>
        );
    }
}

export default Viewer;
