import React, { Component } from 'react';
import Header from './header/Header'
import Body from './body/Body'
import './Viewer.scss';
import Overlay from '@/components/page-viewer/suggest/_Overlay'
//removed in production build
import Test from '@/components/test/test'

class Viewer extends Component {
    render() {
        return (
        <div className='viewer'>
            <Header></Header>
            <Body></Body>
            <Overlay></Overlay>
			<Test></Test>
        </div>
        );
    }
}

export default Viewer;
