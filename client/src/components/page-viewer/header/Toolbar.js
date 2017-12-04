import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sortSuggestions } from '@/store/suggestions'
const { SORT_VOTES, SORT_NEW } = require('@shared/suggestion-util')

class Toolbar extends Component {
	constructor(){
		super()
		this.state = {
			sortBy: SORT_VOTES
		}
	}
    render() {
        return (
            <div class="toolbar flex">
				{this.sortBy()}
                {this.testBtn()}
            </div>
        );
	}
	sortBy(){
		return (
			<div class="is-size-7 flex-center">
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
	onSortByChanged(e){
		let sortBy = e.target.value
		this.setState({ sortBy })
		this.props.sortSuggestions(sortBy)
	}
    testBtn(){
        if(process.env.NODE_ENV !== 'development')
            return null
		
        let generate = ()=> require('axios').post(`/api/channels/${23435553}/suggestions/test`)
        return (
            <button class="m-l-a" onClick={generate}>g</button>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		sortSuggestions: (sortBy)=>dispatch(sortSuggestions(sortBy))
    }
}
const Toolbar_C = connect(null, mapDispatchToProps)(Toolbar)


export default Toolbar_C;
