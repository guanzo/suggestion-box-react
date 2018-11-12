import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Viewer from './page-viewer/Viewer'
import LiveConfig from './page-liveconfig/LiveConfig'
import Config from './page-config/Config'

class App extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.theme !== this.props.theme) {
            this.applyTheme(this.props.theme)
        }
    }
	render(){
		return (
			<Router>
				<div className="app height-100">
					<Route path="*/viewer.html" component={Viewer}/>
					<Route path="*/liveconfig.html" component={LiveConfig}/>
					<Route path="*/config.html" component={Config}/>
				</div>
			</Router>
		)
    }
    applyTheme (theme) {
        const { color, colorSecondary, colorContrast } = theme
        const $root = document.querySelector(':root')
        $root.style.setProperty('--theme-color', color)
        $root.style.setProperty('--theme-color-secondary', colorSecondary)
        $root.style.setProperty('--theme-color-contrast', colorContrast)
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
		theme: state.channel.theme,
    }
}

export default connect(mapStateToProps)(App)
