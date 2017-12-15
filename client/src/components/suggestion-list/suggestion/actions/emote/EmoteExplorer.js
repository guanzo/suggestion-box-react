import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
class EmoteExplorer extends PureComponent {
	constructor(props){
		super(props)
		console.log(props)
		this.state = {
			query: ''
		}
	}
    render() {
		let { query } = this.state
		let { getEmoteImg } = this.props
		let emotes = this.searchedEmotes()
        return (
            <div className="emote-explorer">
				<div class="subtitle is-size-6 has-text-centered">Emote reactions</div>
				<div>
				{emotes.map(d=>(
					<img className="emote-image" src={getEmoteImg(d.id)} key={d.id}/>
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
		const maxEmotes = 15
		let { query } = this.state
		let { emotes } = this.props
		let regex = new RegExp(query,'i');
		return _(emotes).filter(d=>regex.test(d.code))
						.take(maxEmotes)
						.value()
	}
}

export default EmoteExplorer
