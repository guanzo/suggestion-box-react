import React, { Component } from 'react';
import { connect } from 'react-redux'
import Actions from './actions/Actions'
import { isAdminSelector } from '@/store/user'
import moment from 'moment'
import classNames from 'classnames'
import './Suggestion.scss'
const { 
	LIST_PENDING, STATUS_APPROVED, STATUS_DELETED 
} = require('@shared/suggestion-util')

class Suggestion extends Component {
    render() {
		let { text } = this.props
		let statusClassNames = this.getStatusClassnames()
		let className = classNames('suggestion', statusClassNames)
        return (
            <div className={className}>
                <div className="suggestion-header is-size-7 m-b-5">
                    <div className="profile-img m-r-10 flex-center">
                        {this.img()}
                    </div>
                    <div>
                        <div>{this.name()}</div>
                        <div className="suggestion-date">{this.date()}</div>
                    </div>
                </div>
                <p className="suggestion-text m-b-5">{text}</p>
                <Actions {...this.props}></Actions>
            </div>
        );
	}//suggestion can be deleted anywhere
	 //approval can only happen in pending list
	getStatusClassnames(){
		let { status, listType } = this.props
		let isApproved = status === STATUS_APPROVED && listType === LIST_PENDING

		return classNames(
			{ 'is-approved': isApproved },
			{ 'is-deleted': status === STATUS_DELETED }
		)
	}
    img(){
        let { postAnonymously, user } = this.props
        return postAnonymously 
        ? <i className="fa fa-user-circle-o"></i> 
        : <img src={user.profileImg} alt="profile" />
    }
    name(){
        let { user, postAnonymously } = this.props
        return postAnonymously ? 'Anonymous' : user.name
    }
    date(){
        let date = moment(this.props.createdAt)
        let year = date.year()
        let currentYear = moment().year()
        let fmt = 'MMM D'
        if(year !== currentYear)
            fmt += ' YYYY'
        return date.format(fmt)
	}
}

const mapStateToProps = (state, ownProps) => {
	let { channel, user } = state
    return {
		channel: channel,
		currentUser: {
			...user,
			isAdmin: isAdminSelector(state)
		},
    }
}
export default connect(mapStateToProps)(Suggestion)