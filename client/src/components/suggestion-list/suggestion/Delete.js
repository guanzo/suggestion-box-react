import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteSuggestion } from '@/store/suggestions'

class Delete extends Component {
	constructor(){
		super()
		this.state = {
			wasDeleted: false
		}
	}
    render() {
		let { broadcasterUpvoted, channel } = this.props
        return (
            <div class="delete-suggestion m-l-a">
                <i onClick={this.onClick.bind(this)} class='fa fa-trash-o'></i>
            </div>
        )
	}
	onClick(){
		this.props.deleteSuggestion()
		.then(res=>{
			let status = res.status
			if(status === 200)
				this.setState({ wasDeleted: true })
		})
	}
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        deleteSuggestion: ()=> dispatch(deleteSuggestion(ownProps.id))
    }
}
const Delete_C = connect(null, mapDispatchToProps)(Delete)

export default Delete_C;

