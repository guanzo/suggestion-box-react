import React, { Component } from 'react';
import Toolbar from './Toolbar'

class Header extends Component {
    render() {
        return (
            <div class="viewer-header m-b-10">
                <h1 class="title has-text-centered">Suggestion Box</h1>
				<Toolbar></Toolbar>
            </div>
        );
    }
}
export default Header;
