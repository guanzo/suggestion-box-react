
import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import {Toolbar} from '../Toolbar';
const { 
	SORT_VOTES, SORT_NEW, LIST_APPROVED, LIST_PENDING
} = require('@shared/suggestion-util')

function mockProps({currentListType = LIST_APPROVED, isAdmin, hasSuggestions = false}){
	return {
		currentUser: {
			isAdmin
		},
		listType: currentListType,
		hasSuggestions
	}
}

describe('<Toolbar />',()=>{
	it('does not show admin dropdown to non-admins', () => {
		const props = { isAdmin: false }
		const wrapper = shallow(<Toolbar {...mockProps(props)}/>)
		expect(wrapper.find('.select-list-type')).toHaveLength(0);
	})
	it('shows admin dropdown to admins', () => {
		const props = { isAdmin: true }
		const wrapper = shallow(<Toolbar {...mockProps(props)}/>)
		expect(wrapper.find('.select-list-type')).toHaveLength(1);
	})
	it('renders correctly',()=>{
		const props = { isAdmin: true }
		const tree = renderer 
		.create(<Toolbar {...mockProps(props)}/>)
		.toJSON();
	  	expect(tree).toMatchSnapshot();
	})
})