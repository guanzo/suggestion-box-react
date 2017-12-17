/*eslint react/jsx-no-bind:0*/

import React, { PureComponent } from 'react';
import _ from 'lodash'
import FlipMove from 'react-flip-move'
import classNames from 'classnames'
import EmoteImage from './EmoteImage'

class Reactions extends PureComponent {
	constructor(props){
		super(props)
		this.state = {
			limit: 3,
			showAll: false,
			reactions: []
		}
	}
	componentWillReceiveProps(props){
		let { emoteReactions } = props
		let reactions = this.groupedEmotes(emoteReactions)
		this.setState({ reactions })
	}
    render() {
		let { onSelectEmote, allowedToEmote } = this.props
		let { reactions, showAll, limit } = this.state
		reactions = showAll ? reactions : reactions.slice(0,limit)

		let className = classNames('reaction', allowedToEmote ? 'reaction-clickable':'')
		let animation = {
			from: { transform: 'rotateX(90deg)', opacity: 0 }
		}
		return (
			<React.Fragment>
				<FlipMove typeName={null} staggerDelayBy={50}
							enterAnimation={animation} leaveAnimation="none"
				>
					{reactions.map(({emoteId, count})=>(
						<div onClick={e=>onSelectEmote(emoteId)} 
							className={className} 
							key={emoteId}
						>
							<EmoteImage emote={{id: emoteId}}></EmoteImage>
							<div className="reaction-count">{count}</div>
						</div>
					))}
					{this.remainingEmotes()}
				</FlipMove>
			</React.Fragment>
		)
	}
	remainingEmotes(){
		let { reactions, showAll, limit } = this.state
		let remaining = reactions.length - limit
		return (
			remaining > 0 && !showAll
			? <div onClick={this.showAllEmotes} key='showall'
					className="show-all-emotes is-size-7">{remaining} more</div> 
			: null
		)
	}
	showAllEmotes = ()=>{
		this.setState({ showAll: true })
	}
	groupedEmotes(emoteReactions){
		return _(emoteReactions)
				.countBy()
				.map((val,key)=>({emoteId: key, count: val}))
				.orderBy('count',['desc'])
				.value()
	}
}

export default Reactions

