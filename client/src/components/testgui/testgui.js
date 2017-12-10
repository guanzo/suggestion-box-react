/* eslint react/jsx-no-bind: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { isAdminSelector } from '@store/user'
import './test.scss'
import store from '@store'

const MY_ID = 23435553

class Test extends PureComponent {
    render() {
		let { currentUser, channel } = this.props
		if(parseInt(currentUser.id,10) !== MY_ID || parseInt(channel.channelId,10) !== MY_ID)
			return null;

        let generate = ()=> require('axios').post(`/api/channels/${MY_ID}/suggestions/test`)
        return (
            <div className="test">
				<button onClick={e=>this.test('isAnonymousUser')}>anon</button>
				<button onClick={e=>this.test('isOpaqueUser')}>opaque</button>
				<button onClick={e=>this.test('isRealUser')}>real</button>
				<button onClick={e=>this.test('isModerator')}>mod</button>
				<button onClick={e=>this.test('isBroadcaster')}>broadcaster</button>
				<button onClick={generate}>generate</button>
			</div>
        )
	}
	test = (role)=>{
		const roles = {
			isAnonymousUser:false,
			isOpaqueUser: 	false,
			isRealUser: 	false,
			isModerator: 	false,
			isBroadcaster: 	false,
		}
		roles[role] = true
		store.dispatch({
			type: 'TEST_USER_ROLE',
			roles
		})
		
	}
}

const mapStateToProps = (state) => {
	let { user, suggestions, channel } = state
	let { currentListType } = suggestions

	return {
		currentUser: {
			...user,
			isAdmin: isAdminSelector(state)
		},
		channel,
		listType: currentListType,
		hasSuggestions: suggestions[currentListType].data.length > 0,
    }
}
export default connect(mapStateToProps, null)(Test)


