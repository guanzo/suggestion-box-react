import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { toggleUpvote } from '@/store/suggestions'
import classNames from 'classnames'

class Upvote extends PureComponent {
    render() {
		let { hasUpvoted, votesLength, broadcasterUpvoted, channel } = this.props
        let iconClass = classNames('fa m-r-5',
        hasUpvoted ? 'fa-thumbs-up':'fa-thumbs-o-up',
        { 
            'has-text-primary': votesLength > 0 
        })

        return (
        <div className="flex align-center justify-start">
            <i onClick={this.props.toggleUpvote} className={iconClass}></i>
            <div className="is-size-7">{votesLength.toLocaleString()}</div>
			<p className="m-l-10 is-size-7">{ broadcasterUpvoted ? `${channel.channelName} likes this` : null }</p>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        toggleUpvote: ()=> dispatch(toggleUpvote(ownProps))
    }
}
export default connect(null, mapDispatchToProps)(Upvote)


