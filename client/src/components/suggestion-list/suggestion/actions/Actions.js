import React, { Component } from 'react';
import Upvote from './Upvote'
import Approve from './Approve'
import Delete from './Delete'

class Actions extends Component {

    render() {
		let { currentUser } = this.props
        return (
            <div class="suggestion-actions flex">
				<Upvote {...this.props}></Upvote>
				{ currentUser.isAdmin ? this.adminActions() : '' }
            </div>
        )
	}
	adminActions(){
		return (
			<div class="flex m-l-a">
				<Approve {...this.props}></Approve>
				<Delete {...this.props}></Delete> 
			</div>
		)
	}
}

export default Actions;
