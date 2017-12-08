import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { toggleUpvote } from '@store/suggestions'
import classNames from 'classnames'

class Upvote extends PureComponent {
    render() {
		let { hasUpvoted, votesLength, broadcasterUpvoted, channel, currentUser } = this.props
		let { isAnonymousUser } = currentUser
		let thumbIcon = hasUpvoted ? 'fa-thumbs-up':'fa-thumbs-o-up'
        let classes = classNames('fa',thumbIcon,{'has-text-primary': votesLength > 0})

		const title = isAnonymousUser ? 'You must login to upvote':''

        return (
        <div className="flex align-center justify-start">
            <span className="icon">
				<i onClick={this.props.toggleUpvote} className={classes} title={title}></i>
			</span>
            <div className="is-size-7">{votesLength.toLocaleString()}</div>
			<p className="m-l-10 is-size-7">{ broadcasterUpvoted ? `${channel.channelName} likes this` : null }</p>
        </div>
        );
	}
	//on click, check if is anon user. if so, don't dispatch and show alert
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        toggleUpvote: ()=> dispatch(toggleUpvote(ownProps))
    }
}
export default connect(null, mapDispatchToProps)(Upvote)


