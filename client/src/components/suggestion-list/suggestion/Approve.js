import React, { Component } from 'react';
import { connect } from 'react-redux'
import { approveSuggestion } from '@/store/suggestions-admin'
const { STATUS_APPROVED } = require('@shared/suggestion-util')

class Approve extends Component {
    render() {
		let { status } = this.props
		let component;
		if(status === STATUS_APPROVED)
			component = <div class="has-text-success help">approved</div>
		else
			component = <i class='fa fa-check-square-o' 
							onClick={this.props.approveSuggestion}
						></i>

        return (
            <div class="m-l-a">
                { component }
            </div>
        )
	}
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        approveSuggestion: ()=> dispatch(approveSuggestion(ownProps))
    }
}
const Approve_C = connect(null, mapDispatchToProps)(Approve)

export default Approve_C;

