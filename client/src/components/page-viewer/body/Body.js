import React, { Component } from 'react';
import { connect } from 'react-redux'
import SuggestionList from '@components/suggestion-list/SuggestionList'
const { LIST_APPROVED } = require('@shared/suggestion-util')

class Body extends Component {
    render() {
		const style = {
			flex: 1
		}

		let { suggestions, isLoading } = this.props
		let component = (suggestions.data.length || isLoading)
						? <SuggestionList {...this.props}></SuggestionList>
						: this.noSuggestions()
        return (
			<div className="viewer-body" style={style}>
				{component}
			</div>
        );
    }
	noSuggestions(){
		let { listType } = this.props.suggestions
        return (
            <div className="absolute-center-self width-100 is-size-5 has-text-centered has-text-grey">
				{ listType === LIST_APPROVED
					? <div>No suggestions yet...</div>
					: <div>No pending suggestions</div>
				}
            </div>
        )
	}
}

const mapStateToProps = (state, ownProps) => {
	let { currentListType } = state.suggestions
    return {
		suggestions: state.suggestions[currentListType],
		isLoading: state.isLoading
    }
}
export default connect(mapStateToProps)(Body)
