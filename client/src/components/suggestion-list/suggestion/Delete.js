import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteSuggestion } from '@/store/suggestions'
const { STATUS_DELETED } = require('@shared/suggestion-util')

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
			component = <div class="has-text-danger help">deleted</div>
		else if(askToConfirm)
			component = this.confirm()
		else
			component = <i class='fa fa-trash-o' onClick={e=>this.setState({ askToConfirm: true })}></i>

        return (
            <div class="m-l-a">
                { component }
            </div>
        )
	}
	confirm(){
		const style = { cursor: 'pointer' }
		return (
			<div class="help flex wrap justify-end m-t-0">
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
        deleteSuggestion: ()=> dispatch(deleteSuggestion(ownProps))
    }
}
const Delete_C = connect(null, mapDispatchToProps)(Delete)

export default Delete_C;

