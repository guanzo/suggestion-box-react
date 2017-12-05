import React, { Component } from 'react';
import { connect } from 'react-redux'
import SuggestionList from '@/components/suggestion-list/SuggestionList'
const { LIST_APPROVED } = require('@shared/suggestion-util')


class Body extends Component {
    render() {
		const style = {
			position: 'relative',
			flex: 1
		}

		let { suggestions, isLoading } = this.props
		var component;
		/* if(isLoading)
			component = <div class="element is-loading absolute-center"></div>
		else  */
		if(suggestions.data.length || isLoading)
			component = <SuggestionList></SuggestionList>
		else
			component = this.noSuggestions()

        return (
			<div class="viewer-body" style={style}>
				{component}
			</div>
        );
    }
	noSuggestions(){
		let listType = this.props.suggestions.listType
		const style = {
			'text-align': 'center',
			width: '100%',
			color: 'grey'
		}
        return (
            <div class="no-suggestions absolute-center" style={style}>
                { listType === LIST_APPROVED ? this.noApproved() : this.noPending() }
            </div>
        )
	}
    noApproved(){
        return (
			<div>
				No suggestions yet...<br/>
				Must be the perfect stream
			</div>
        )
	}
	noPending(){
        return <div>No pending suggestions</div>
	}
}


const mapStateToProps = (state, ownProps) => {
	let { currentListType } = state.suggestions
    return {
		suggestions: state.suggestions[currentListType],
		currentUser: state.user,
		channel: state.channel,
		isLoading: state.isLoading
    }
}
const Body_C = connect(mapStateToProps)(Body)


export default Body_C;
