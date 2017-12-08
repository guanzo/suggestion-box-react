import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { isAdminSelector } from '@store/user'
import { sortSuggestions } from '@store/suggestions'
import { changeCurrentListType } from '@store/suggestions-admin'
const { 
	SORT_VOTES, SORT_NEW, LIST_APPROVED, LIST_PENDING
} = require('@shared/suggestion-util')

export class Toolbar extends Component {
	constructor(props){
		super(props)
		this.state = {
			sortBy: SORT_VOTES,
			listType: LIST_APPROVED
		}
		this.onSortByChanged = this.onSortByChanged.bind(this)
		this.onListTypeChanged = this.onListTypeChanged.bind(this)
	}
    render() {
		let { hasSuggestions, listType, currentUser } = this.props
		let showSortBy = hasSuggestions && listType === LIST_APPROVED
		const duration = 250;
        return (
            <div className="toolbar flex is-size-7">
				<Transition in={showSortBy} timeout={duration} unmountOnExit>
					{(state) => this.sortBy(state, duration)}
				</Transition>
				{ currentUser.isAdmin ? this.listType() : null }
            </div>
        );
	}
	sortBy(transitionState, duration){
		const defaultStyle = {
			transition: `${duration}ms`,
			opacity: 0,
		}
		const transitionStyles = {
			entering: { opacity: 0 },
			entered:  { opacity: 1 },
		};
		return (
			<div className="flex-center"
				style={{
					...defaultStyle,
					...transitionStyles[transitionState]
				}}
			>
				<span className="m-r-5">Sort by</span>
				<div className="select is-small select-sort-by">
					<select value={this.state.sortBy} 
							onChange={this.onSortByChanged}
					>
						<option value={SORT_VOTES}>Top</option>
						<option value={SORT_NEW}>New</option>
						{/* <option value={SORT_BROADCASTER_VOTES}>Broadcaster likes</option> */}
					</select>
				</div>
			</div>
		)
	}
	listType(){
		return (
			<div className="flex-center m-l-a">
				<span className="m-r-5">Admin</span>
				<div className="select is-small select-list-type">
					<select value={this.state.listType} 
							onChange={this.onListTypeChanged}
					>
						<option value={LIST_APPROVED}>Approved</option>
						<option value={LIST_PENDING}>Pending</option>
					</select>
				</div>
			</div>
		)
	}
	onListTypeChanged(e){
		let listType = e.target.value
		this.setState({ listType })
		this.props.changeCurrentListType(listType)
	}
	onSortByChanged(e){
		let sortBy = e.target.value
		this.setState({ sortBy })
		this.props.sortSuggestions(sortBy)
	}
}

const mapStateToProps = (state) => {
	let { user, suggestions } = state
	let { currentListType } = suggestions

	return {
		currentUser: {
			...user,
			isAdmin: isAdminSelector(state)
		},
		listType: currentListType,
		hasSuggestions: suggestions[currentListType].data.length > 0,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		changeCurrentListType: (listType)=>dispatch(changeCurrentListType(listType)),
		sortSuggestions: (sortBy)=>dispatch(sortSuggestions(sortBy))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
