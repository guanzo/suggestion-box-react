import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Actions from './Actions';
import Approve from './Approve'
import Delete from './Delete'

const data = {
	hasUpvoted: true,
	votesLength: 1,
	broadcasterUpvoted: true,
	channel:{
		channelName: 'guanzo'
	},
	currentUser: {
		isAdmin: false
	}
}
function mockStore(store){
	let rootReducer = ()=>store
	return createStore(rootReducer)
}

describe('<Actions />',()=>{
	it('does not show admin actions to non-admins', () => {
		const store =mockStore(Object.assign({},data,{ currentUser:{ isAdmin:false } }))
		const wrapper = shallow(<Actions {...store.getState()} store={store}/>)
		expect(wrapper.find(Approve)).toHaveLength(0);
	})

	it('shows admin actions to admins', () => {
		const store = mockStore(Object.assign({},data,{ currentUser:{ isAdmin:true } }))
		const wrapper = shallow(<Actions {...store.getState()} store={store}/>)
		expect(wrapper.find(Approve)).toHaveLength(1);
	})
	it('renders correctly',()=>{
		const store = mockStore(Object.assign({},data,{ currentUser:{ isAdmin:true } }))
		const tree = renderer
		.create(<Actions {...store.getState()} store={store}/>)
		.toJSON();
	  	expect(tree).toMatchSnapshot();
	})
})