import React, { PureComponent } from 'react';
import Upvote from './Upvote'
import Emote from './emote/Emote'
import Approve from './Approve'
import Delete from './Delete'

class Actions extends PureComponent {

    render() {
		let { currentUser } = this.props
        return (
            <div className="suggestion-actions">
				<div className="flex">
					<Upvote {...this.props}></Upvote>
					<Emote></Emote>
					{ currentUser.isAdmin ? this.adminActions() : null }
				</div>
            </div>
        )
	}
	adminActions(){
		return (
			<div className="suggestion-admin-actions flex-center m-l-a">
				<Approve {...this.props}></Approve>
				<Delete {...this.props}></Delete> 
			</div>
		)
	}
}

export default Actions;
