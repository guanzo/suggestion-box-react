
import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import {Upvote} from '../Upvote';
const { 
	SORT_VOTES, SORT_NEW, LIST_APPROVED, LIST_PENDING
} = require('@shared/suggestion-util')

function mockProps(){
	return {
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
}

describe('<Upvote />',()=>{
	it('renders correctly',()=>{
		const component = renderer.create(<Upvote {...mockProps()}/>)
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();

		/* tree.broadcasterUpvoted = false
		tree = component.toJSON();
		expect(tree).toMatchSnapshot(); */
	})
})