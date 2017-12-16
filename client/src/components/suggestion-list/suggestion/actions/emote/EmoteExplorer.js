import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
class EmoteExplorer extends PureComponent {
	constructor(props){
		super(props)
		this.state = {
			query: ''
		}
	}
    render() {
		let { query } = this.state
		let { getEmoteImg, onSelectEmote } = this.props
		let emotes = this.searchedEmotes()
        return (
            <div className="emote-explorer">
				<div className="subtitle is-size-6 has-text-centered m-b-0">
					Emote reactions
				</div>
				<div className="emote-grid">
				{emotes.map(d=>(
					<div className="emote-image-wrapper" key={d.id}>
						<img className="emote-image"
							onClick={e=>onSelectEmote(d.id)}
							src={getEmoteImg(d.id)} 
							alt={d.code}
							title={d.code}
						/>
					</div>
				))}
				</div>
				<div className="field">
					<div className="control is-expanded">
						<input className="input is-primary is-small" 
							onChange={this.handleInput} 
							value={query} 
							placeholder='Search for Emotes'
						/>
					</div>
				</div>
			</div>
        )
	}
	handleInput = (e)=>{
		this.setState({ query: e.target.value })
	}
	searchedEmotes(){
		const maxEmotes = 32
		let { query } = this.state
		let { emotes } = this.props
		//escape regex special characters
		query = query.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
		let regex = new RegExp(query,'i');
		return _(emotes)
				.filter(d=>regex.test(d.code))
				.take(maxEmotes)
				.value()
	}
}

export default EmoteExplorer
