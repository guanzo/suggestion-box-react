/*eslint react/jsx-no-bind:0*/

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateSuggestionStatus } from '@store/suggestions-admin'
const { STATUS_DELETED } = require('@shared/suggestion-util')

//admins can delete a suggestion in any list
class Delete extends Component {
	constructor(){
		super()
		this.state = {
			askToConfirm: false
		}
	}

    render() {
		let { askToConfirm } = this.state
		let { status } = this.props
		let component;
		if(status === STATUS_DELETED)
			component = <div className="has-text-danger is-size-7">deleted</div>
		else if(askToConfirm)
			component = this.confirm()
		else
			component = <span className="delete-suggestion icon has-text-danger">
							<i className='fa fa-trash-o' 
								onClick={e=>this.setState({ askToConfirm: true })}
							></i>
						</span>

        return component
	}
	confirm(){
		const style = { cursor: 'pointer' }
		return (
			<div className="flex wrap justify-end is-size-7">
				<span className="has-text-danger">are you sure?</span>&nbsp;
				<div className="flex">
					<div onClick={this.props.deleteSuggestion} style={style}>yes</div>&nbsp;
					<div className="has-text-danger">/</div>&nbsp;
					<div onClick={e=>this.setState({ askToConfirm: false })} style={style}>no</div>
				</div>	
			</div> 
		)
	}
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        deleteSuggestion: ()=> {
			let data = {
				...ownProps,
				status: STATUS_DELETED
			}
			dispatch(updateSuggestionStatus(data))
		}
    }
}
export default connect(null, mapDispatchToProps)(Delete)


