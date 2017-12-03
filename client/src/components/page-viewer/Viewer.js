import React, { Component } from 'react';
import Header from './header/Header'
import { connect } from 'react-redux'
import Body from './body/Body'
import './Viewer.scss';
import classNames from 'classnames'

class Viewer extends Component {
    render() {
		let { hasOverlay } = this.props
		let className = classNames('viewer',{ 'has-overlay':hasOverlay })
        return (
        <div class={className}>
            <Header></Header>
            <Body></Body>
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
