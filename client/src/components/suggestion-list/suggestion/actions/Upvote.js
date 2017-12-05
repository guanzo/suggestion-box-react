import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleUpvote } from '@/store/suggestions'
import classNames from 'classnames'

class Upvote extends Component {
	constructor(props){
		super(props)
		//get initial upvote state from props, then toggle local state
		this.state = {
			hasUpvoted: props.hasUpvoted
		}
	}
    render() {
		let { hasUpvoted } = this.state
		let { votesLength, broadcasterUpvoted, channel } = this.props
        let iconClass = classNames('fa m-r-5',
        hasUpvoted ? 'fa-thumbs-up':'fa-thumbs-o-up',
        { 
            'has-text-primary': votesLength > 0 
        })

        return (
        <div class="flex align-center justify-start">
            <i onClick={this.onClick.bind(this)} class={iconClass}></i>
            <div class="is-size-7">{votesLength.toLocaleString()}</div>
			<p class="m-l-10 is-size-7">{ broadcasterUpvoted ? `${channel.channelName} likes this` : '' }</p>
        </div>
        );
	}
	onClick(){
		let hasUpvoted = !this.state.hasUpvoted
		this.setState({ hasUpvoted })
		this.props.toggleUpvote(hasUpvoted)
	}
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        toggleUpvote: (hasUpvoted)=> dispatch(toggleUpvote(ownProps.id, hasUpvoted))
    }
}
const Upvote_C = connect(null, mapDispatchToProps)(Upvote)

export default Upvote_C;

