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
		let component;
		/* if(isLoading)
			component = <div className="element is-loading absolute-center"></div>
		else  */
		if(suggestions.data.length || isLoading)
			component = <SuggestionList {...this.props}></SuggestionList>
		else
			component = this.noSuggestions()

        return (
			<div className="viewer-body" style={style}>
				{component}
			</div>
        );
    }
	noSuggestions(){
		let listType = this.props.suggestions.listType
		const style = {
			color: 'grey'
		}
        return (
            <div className="no-suggestions absolute-center width-100 has-text-centered" style={style}>
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
		isLoading: state.isLoading
    }
}
export default connect(mapStateToProps)(Body)

