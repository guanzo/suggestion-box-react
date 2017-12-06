import React, { Component } from 'react';
import Header from '../page-viewer/header/Header'
import Body from '../page-viewer/body/Body'
import '../page-viewer/Viewer.scss';
import Overlay from '@/components/page-viewer/suggest/_Overlay'

//same as viewer component for now
//will include some small modifications
class LiveConfig extends Component {
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

export default LiveConfig;
