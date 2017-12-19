import React, { PureComponent } from 'react';
import _ from 'lodash'
import EmoteImage from './EmoteImage'

class EmoteExplorer extends PureComponent {
	constructor(props){
		super(props)
		this.state = {
			query: ''
		}
	}
    render() {
		let { query } = this.state
		let { onSelectEmote } = this.props
		let emotes = this.searchedEmotes()
        return (
            <div className="emote-explorer">
				<div className="subtitle is-size-6 has-text-centered m-b-0">
					Emote reactions
				</div>
				<div className="emote-grid">
				{emotes.map(emote=>(
					<EmoteImage emote={emote}
						onSelectEmote={onSelectEmote} 
						key={emote.id}
					></EmoteImage>
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
		this.setState({ query: e.target.value.trim() })
	}
	searchedEmotes(){
		const maxEmotes = 33
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
