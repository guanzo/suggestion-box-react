import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { toggleUpvote } from '@store/suggestions'
import classNames from 'classnames'

export class Upvote extends PureComponent {
    render() {
		let { hasUpvoted, votesLength, currentUser } = this.props
		let { isAnonymousUser } = currentUser
		let thumbIcon = hasUpvoted ? 'fa-thumbs-up':'fa-thumbs-o-up'
        let classes = classNames('fa',thumbIcon,{'has-text-primary': votesLength > 0})

		const title = isAnonymousUser ? 'You must login to upvote':''
		const style = { cursor: isAnonymousUser ? 'not-allowed' : 'pointer' }
        return (
        <div className="upvote flex align-center m-r-5">
            <span className="icon">
				<i onClick={this.props.toggleUpvote} className={classes} style={style} title={title}></i>
			</span>
            <div className="is-size-7">{votesLength.toLocaleString()}</div>
		</div>
        );
	}
	//on click, check if is anon user. if so, don't dispatch and show alert
}


const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        toggleUpvote: ()=> {
			if(ownProps.currentUser.isAnonymousUser)
				return;
			dispatch(toggleUpvote(ownProps))
		}
    }
}
export default connect(null, mapDispatchToProps)(Upvote)


