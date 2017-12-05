import React, { Component } from 'react';
import Upvote from './Upvote'
import Approve from './Approve'
import Delete from './Delete'

class Actions extends Component {
    render() {
		
        return (
            <div class="suggestion-actions">
                <div class="flex">
                    <Upvote {...this.props}></Upvote>
					{ this.userIsAdmin() ? <Delete {...this.props}></Delete> : '' }
					{ this.userIsAdmin() ? <Approve {...this.props}></Approve> : '' }
				</div>
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
