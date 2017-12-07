import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { updateSuggestionStatus } from '@/store/suggestions-admin'
const { STATUS_APPROVED, LIST_APPROVED } = require('@shared/suggestion-util')

//admins can only approve suggestions in the pending list
class Approve extends PureComponent {
    render() {
		let { status, listType } = this.props
		if(listType === LIST_APPROVED)
			return null

		let component;
		if(status === STATUS_APPROVED)
			component = <div className="has-text-success is-size-7 m-r-5">approved</div>
		else
			component = <i className='fa fa-check-square-o m-r-5' 
							style={{ verticalAlign:'middle' }}
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
export default connect(null, mapDispatchToProps)(Approve)


