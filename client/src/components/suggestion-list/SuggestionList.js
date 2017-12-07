import React, { Component } from 'react';
import Suggestion from './suggestion/Suggestion'
import LoadMore from './LoadMore'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './SuggestionList.scss'

const end = el => el.addEventListener('transitionend',()=>el.style.transitionDelay = null, false)
const Fade = ({ children, index, ...props }) => (
	<CSSTransition
		{...props}
		timeout={250}
		classNames="fade"
		// eslint-disable-next-line react/jsx-no-bind
		onEnter={el=>el.style.transitionDelay = `${index*.05}s`}
		addEndListener={end}	
		appear
		exit={false}
	>
	  {children}
	</CSSTransition>
);

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
        return (
            <TransitionGroup className="suggestions-list">
                {suggestions.data.map((suggestion,i)=>(
					<Fade index={hasPaginated ? 0 : i}
						  key={suggestion.id}
					>
						<Suggestion 
							{...suggestion} 
							listType={listType}
						>
						</Suggestion>
					</Fade>
                ))}
                <LoadMore onClick={this.onPaginate}{...this.props} hasPaginated={hasPaginated}></LoadMore>
            </TransitionGroup>
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