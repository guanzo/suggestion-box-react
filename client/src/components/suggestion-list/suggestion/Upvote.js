import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleUpvote } from '@/store/suggestions'
import classNames from 'classnames'

class Upvote extends Component {
    render() {
		let { hasUpvoted, votesLength } = this.props
        let thumbsClass = classNames('fa m-r-5',
        hasUpvoted ? 'fa-thumbs-up':'fa-thumbs-o-up',
        { 
            'has-text-primary': votesLength > 0 
        })

        return (
        <div class="flex">
            <i onClick={this.props.toggleUpvote} class={thumbsClass}></i>
            <div class="is-size-7">{votesLength.toLocaleString()}</div>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        toggleUpvote: ()=> dispatch(toggleUpvote(ownProps))
    }
}
const Upvote_C = connect(null, mapDispatchToProps)(Upvote)

export default Upvote_C;

