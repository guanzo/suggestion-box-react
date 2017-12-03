import React, { Component } from 'react';
import Upvote from './Upvote'

class Actions extends Component {
    render() {
        
        return (
            <div class="suggestion-actions">
                <div class="flex">
                    <Upvote {...this.props}></Upvote>
                </div>
            </div>
        )
    }
}

export default Actions;
