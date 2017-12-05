import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateSuggestionStatus } from '@/store/suggestions-admin'
const { STATUS_APPROVED, LIST_APPROVED } = require('@shared/suggestion-util')

//admins can only approve suggestions in the pending list
class Approve extends Component {
    render() {
		let { status, listType } = this.props
		if(listType === LIST_APPROVED)
			return null

		let component;
		if(status === STATUS_APPROVED)
			component = <div class="has-text-success is-size-7 m-r-5">approved</div>
		else
			component = <i class='fa fa-check-square-o m-r-5' 
							style={{ 'vertical-align':'middle' }}
							onClick={this.props.approveSuggestion}
						></i>

        return component
	}
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        approveSuggestion: ()=> {
			let data = {
				...ownProps,
				status: STATUS_APPROVED
			}
			dispatch(updateSuggestionStatus(data))
		}
    }
}
const Approve_C = connect(null, mapDispatchToProps)(Approve)

export default Approve_C;

