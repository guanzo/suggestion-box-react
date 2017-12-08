import React, { Component } from 'react';
import Toolbar from './Toolbar'
import './Header.scss'

class Header extends Component {
    render() {
		
        return (
            <div className="viewer-header">
                <h1 className="title has-text-centered p-a-10 m-b-0 has-text-weight-normal">
				Suggestion Box
				</h1>
				<Toolbar></Toolbar>
            </div>
        );
    }
}
export default Header;
