import React, { Component } from 'react';
import { connect } from 'react-redux'
import Toolbar from './Toolbar'
import './Header.scss'

class Header extends Component {
	constructor(props){
		super(props)
		this.state = {
			showNotification: true
		}
	}
    render() {
		let { showNotification } = this.state
		let { currentUser } = this.props
        return (
            <div className="viewer-header">
                <h1 className="title has-text-centered p-a-10 m-b-0 has-text-weight-normal">
				Suggestion Box
				</h1>
				<Toolbar></Toolbar>
				{currentUser.isAnonymousUser && showNotification ? this.anonymousUserNotification() : null}
            </div>
        );
	}
	anonymousUserNotification(){
		/*eslint react/jsx-no-bind:0 */
		return (
			<article class="message is-warning is-small">
				<div class="message-header">
				<p>Anonymous User</p>
				<button onClick={()=>this.setState({ showNotification: false })} class="delete is-small"></button>
				</div>
				<div class="message-body">
					Logged out users cannot upvote or post.
				</div>
			</article>
		)
	}
}

const mapStateToProps = (state) => {
	let { user } = state
	return {
		currentUser: user,
    }
}
export default connect(mapStateToProps)(Header)
