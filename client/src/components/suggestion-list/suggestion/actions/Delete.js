import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateSuggestionStatus } from '@/store/suggestions-admin'
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
			component = <div class="has-text-danger is-size-7">deleted</div>
		else if(askToConfirm)
			component = this.confirm()
		else
			component = <i class='fa fa-trash-o' 
							onClick={e=>this.setState({ askToConfirm: true })}
							></i>

        return component
	}
	confirm(){
		const style = { cursor: 'pointer' }
		return (
			<div class="flex wrap justify-end is-size-7">
				<span class="has-text-danger">are you sure?</span>&nbsp;
				<div class="flex">
					<div onClick={this.props.deleteSuggestion} style={style}>yes</div>&nbsp;
					<div class="has-text-danger">/</div>&nbsp;
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
const Delete_C = connect(null, mapDispatchToProps)(Delete)

export default Delete_C;

