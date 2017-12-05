import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sortSuggestions } from '@/store/suggestions'
import { changeCurrentListType } from '@/store/suggestions-admin'
const { 
	SORT_VOTES, SORT_NEW, LIST_APPROVED, LIST_PENDING
} = require('@shared/suggestion-util')

class Toolbar extends Component {
	constructor(){
		super()
		this.state = {
			sortBy: SORT_VOTES,
			listType: LIST_APPROVED
		}
	}
    render() {
        return (
            <div class="toolbar flex is-size-7">
				{ this.props.hasSuggestions ? this.sortBy() : '' }
				{ this.props.userIsAdmin ? this.listType() : '' }
                {this.testBtn()}
            </div>
        );
	}
	sortBy(){
		return (
			<div class="flex-center">
				<span class="m-r-5">Sort by</span>
				<div class="select is-small">
					<select value={this.state.sortBy} 
							onChange={this.onSortByChanged.bind(this)}
					>
						<option value={SORT_VOTES}>Top</option>
						<option value={SORT_NEW}>New</option>
					</select>
				</div>
			</div>
		)
	}
	listType(){
		return (
			<div class="flex-center m-l-a">
				<span class="m-r-5">Admin</span>
				<div class="select is-small">
					<select value={this.state.listType} 
							onChange={this.onListTypeChanged.bind(this)}
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
    testBtn(){
        if(process.env.NODE_ENV !== 'development')
            return null
		let style = {
			position: 'absolute',
			top: 0,
			right: 0
		}
        let generate = ()=> require('axios').post(`/api/channels/${23435553}/suggestions/test`)
        return (
            <button style={style} onClick={generate}>g</button>
        )
    }
}

const mapStateToProps = (state) => {
	let { currentListType } = state.suggestions
	let { channel, user } = state
	let userIsAdmin = user.isBroadcaster || (user.isModerator && channel.allowModAdmin)
	
    return {
		userIsAdmin,
		hasSuggestions: state.suggestions[currentListType].data.length > 0,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		changeCurrentListType: (listType)=>dispatch(changeCurrentListType(listType)),
		sortSuggestions: (sortBy)=>dispatch(sortSuggestions(sortBy))
    }
}
const Toolbar_C = connect(mapStateToProps, mapDispatchToProps)(Toolbar)


export default Toolbar_C;
