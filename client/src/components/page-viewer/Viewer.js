import React, { Component } from 'react';
import Header from './header/Header'
import { connect } from 'react-redux'
import Body from './body/Body'
import './Viewer.scss';
import classNames from 'classnames'
import Overlay from '@/components/page-viewer/suggest/_Overlay'

class Viewer extends Component {
    render() {
		let { hasOverlay } = this.props
        return (
        <div class='viewer'>
            <Header></Header>
            <Body></Body>
            <Overlay></Overlay>
        </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
		hasOverlay: state.hasOverlay,
    }
}
const Viewer_C = connect(mapStateToProps)(Viewer)
export default Viewer_C;
