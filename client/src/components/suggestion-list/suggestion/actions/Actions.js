import React, { Component } from 'react';
import Upvote from './Upvote'
import Approve from './Approve'
import Delete from './Delete'

class Actions extends Component {
    render() {
        return (
            <div class="suggestion-actions flex">
				<Upvote {...this.props}></Upvote>
				{ this.userIsAdmin() ? this.adminActions() : '' }
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
	userIsAdmin(){
		let { currentUser, channel } = this.props
		let { allowModAdmin } = channel
		return currentUser.isBroadcaster || (currentUser.isModerator && allowModAdmin)
	}
}

export default Actions;
