import React, { Component } from 'react';
import { postSuggestion } from '@store/suggestions'
import store from '@store'
import { delay } from '@util'
import classNames from 'classnames'

class Form extends Component {
    constructor(props){
		super(props)
		let { isRealUser } = this.props.currentUser
        this.state = {
            minLength: 10,
            maxLength: 100,
            suggestion: '',
            postAnonymously: isRealUser ? false : true,
			isLoading: false,
		}
		this.onSubmit = this.onSubmit.bind(this)
	}
    render(){
		const style = { maxWidth: '100%' }
        return (
            <div className="suggestion-form flex column justify-between height-100"
				style={style}
			>
                <div>{this.rules()}</div>
				<div>
				{this.settings()}
				{this.input()}
				</div>
            </div>
        )
    }
    rules(){
		let { rules } = this.props.channel
		const style = { wordWrap: 'break-word' }
        return (
            <div className="m-b-15">
                <h5 className="subtitle is-4 has-text-centered">Rules</h5>
                <ol className="p-l-15" style={style}>
					{ 
						rules.length 
						? rules.map((rule,i)=><li key={i}>{rule}</li>)
						: <div className="has-text-centered">...There are no rules.</div>
					}
                </ol>
            </div>
        )
	}
	handleCheckbox = (e) =>{
		this.setState({ postAnonymously: e.target.checked })
	}
    settings(){
		let { isRealUser } = this.props.currentUser
        if(isRealUser){
            return (
			<div className="field">  
				<div className="control">
					<div className="b-checkbox is-primary">
						<input id="post-anon" type="checkbox"
							className="m-r-5"
							checked={this.state.postAnonymously}
							onChange={this.handleCheckbox}
						/>
						<label htmlFor="post-anon" className="is-size-7"> 
							Post anonymously
						</label>
					</div>
				</div>
			</div>
            )
        }else{
            return (
			<p className="help">
				You will post as anonymous unless you grant this extension your Twitch User ID
			</p>
			)
		}
        
    }
    helpText(){
        let { minLength, maxLength, suggestion } = this.state
        let length = suggestion.length
        if(length === 0)
            return `Enter at least ${minLength} characters`
        else if(length < minLength)
            return `${minLength - length} more to go...`
        else
            return length+'/'+maxLength
	}
	handleInput = (e)=>{
		this.setState({suggestion: e.target.value})
	}
    input() {
        let { minLength, maxLength, suggestion, isLoading } = this.state
        let btnClass = classNames("button is-primary is-small", { 'is-loading': isLoading })
        let { channelName } = this.props.channel
        return (
            <form className="field">
                <div className="control">
                    <textarea className="textarea is-primary" rows="4" 
                            placeholder={`A brilliant suggestion for ${channelName}`} 
                            style={{resize: 'none', overflow:'hidden'}}
                            minLength={minLength}
                            maxLength={maxLength}
                            value={suggestion}
                            onChange={this.handleInput}
                            required
                    >
                    </textarea>
                </div>
                <div className="flex justify-between p-t-5">
                    <p className="help m-t-0">{this.helpText()}</p>
                    <div className="buttons flex nowrap">    
                        <button className="button is-danger is-outlined is-small"
							type="button"
                            onClick={this.props.onClose}
                        >Cancel</button>
                        <button className={btnClass}
                            disabled={suggestion.length < minLength}
                            onClick={this.onSubmit}
                        >Post</button> 
                    </div>
                </div>
            </form>
        )
    }
    onSubmit(e){
        e.preventDefault();

        this.setState({ isLoading: true })
        let { suggestion, postAnonymously } = this.state
        Promise.all([
            store.dispatch(postSuggestion(suggestion, postAnonymously)), 
            delay()//if ajax is too fast it looks weird
        ])
        .then(([status])=>{
            this.setState({ isLoading: false })
			this.props.onSubmitDone(status)
		})
    }
}

export default Form