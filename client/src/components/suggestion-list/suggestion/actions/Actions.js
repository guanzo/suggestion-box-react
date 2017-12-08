import React, { PureComponent } from 'react';
import Upvote from './Upvote'
import Approve from './Approve'
import Delete from './Delete'

class Actions extends PureComponent {

    render() {
		let { currentUser } = this.props
		
        return (
            <div className="suggestion-actions flex">
				<Upvote {...this.props}></Upvote>
				{ currentUser.isAdmin ? this.adminActions() : null }
            </div>
        )
	}
	adminActions(){
		return (
			<div className="flex-center m-l-a">
				<Approve {...this.props}></Approve>
				<Delete {...this.props}></Delete> 
			</div>
		)
	}
}

export default Actions;
