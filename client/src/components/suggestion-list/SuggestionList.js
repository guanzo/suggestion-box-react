import React, { Component } from 'react';
import Suggestion from './suggestion/Suggestion'
import LoadMore from './LoadMore'
import FlipMove from 'react-flip-move'

class SuggestionList extends Component {
	constructor(){
		super()
		this.state = {
			hasPaginated: false
		}
	}
	//only show stagger transition for first set of paginated items, 
	//b/c i can't figure out how to give zero index to newly paginated items for transition delay
	//and it's fine b/c there's not enough height to see the new page
    render(){
		let { hasPaginated } = this.state
		let { suggestions } = this.props
		let { listType } = suggestions
		const animation = {
			from: { transform: 'translateY(30px)', opacity: 0 },
			to:   { transform: 'translateY(0px)' , opacity: 1}
		}
		const delay = hasPaginated ? 0 : 50
        return (
			<React.Fragment>
				<FlipMove appearAnimation={animation} enterAnimation={animation} 
							leaveAnimation="none" staggerDelayBy={delay}
				>
					{suggestions.data.map((suggestion,i)=>(
						<div key={suggestion.id}>
							<Suggestion 
								{...suggestion} 
								listType={listType}
							>
							</Suggestion>
						</div>
					))}
				</FlipMove>
				<LoadMore onClick={this.onPaginate} {...this.props} 
							hasPaginated={hasPaginated}
				></LoadMore>
			</React.Fragment>
        )
	}
	componentWillReceiveProps(nextProps){
		let { listType, sortBy } = this.props.suggestions
		let { listType: nextListType, sortBy: nextSortBy } = nextProps.suggestions
		if(listType !== nextListType || sortBy !== nextSortBy)
			this.setState({ hasPaginated: false })

	}
	onPaginate = ()=>{
		this.setState({ hasPaginated: true })
	}
}

export default SuggestionList