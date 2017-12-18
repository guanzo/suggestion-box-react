
import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Emote } from '../Emote';
import EmoteExplorer from '../EmoteExplorer';


function mockProps({ hasEmoted = false, isAnonymousUser = false } = {}){
	return {
		hasEmoted,
		currentUser: {
			isAnonymousUser
		},
		emotes:[],
		emoteReactions:[],
	}
}

describe('<Emote />',()=>{
	it('does not show emote explorer to anon users',()=>{
		let props = { isAnonymousUser: true }
		const wrapper = shallow(<Emote {...mockProps(props)} />)
		expect(wrapper.find(EmoteExplorer)).toHaveLength(0);
	})
	it('does not show emote explorer to users who have already emoted',()=>{
		let props = { hasEmoted: true }
		const wrapper = shallow(<Emote {...mockProps(props)} />)
		expect(wrapper.find(EmoteExplorer)).toHaveLength(0);
	})
	it('renders correctly',()=>{
		const component = renderer.create(<Emote {...mockProps()}/>)
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	})
})