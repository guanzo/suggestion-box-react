import React, { Component } from 'react';
import './Suggestions.scss';

class Suggestions extends Component {
    render() {
        return (
        <div class="suggestions">
            { this.props.suggestions }
        </div>
        );
    }
}

export default Suggestions;
