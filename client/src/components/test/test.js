/* eslint react/jsx-no-bind: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { isAdminSelector } from '@/store/user'
import './test.scss'
import store from '@/store'

class Test extends PureComponent {
    render() {
		let { currentUser, channel } = this.props
		if(parseInt(currentUser.id,10) !== 23435553 || parseInt(channel.channelId,10) !== 23435553)
			return null;

        let generate = ()=> require('axios').post(`/api/channels/${23435553}/suggestions/test`)
        return (
            <div className="test">
				<button onClick={e=>this.test('isAnonymousUser')}>anon</button>
				<button onClick={e=>this.test('isOpaqueUser')}>opaque</button>
				<button onClick={e=>this.test('isRealUser')}>real</button>
				<button onClick={e=>this.test('isModerator')}>mod</button>
				<button onClick={e=>this.test('isBroadcaster')}>broadcaster</button>
				<button onClick={generate}>generator</button>
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
	onClick = ()=>{
		this.props.onClick()
		this.props.onLoadMore()
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


