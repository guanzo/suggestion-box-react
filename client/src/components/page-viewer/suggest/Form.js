import React, { Component } from 'react';
import { postSuggestion } from '@/store/suggestions'
import store from '@/store'
import { delay } from '@/util'
import classNames from 'classnames'

class Form extends Component {
    constructor(props){
		super(props)
        this.state = {
            minLength: 15,
            maxLength: 100,
            suggestion: '',
            postAnonymously: false,
			isLoading: false,
		}
		this.checkUserType()
	}
	checkUserType(){
		let { isRealUser } = this.props.currentUser
		if(!isRealUser)
			this.setState({ postAnonymously: true })
	}
	componentWillReceiveProps(){
		this.checkUserType()
	}
    render(){
        return (
            <div class="suggestion-form">
                {this.rules()}
				{this.settings()}
				{this.input()}
            </div>
        )
    }
    rules(){
        return (
            <div class="m-b-15">
                <h5 class="subtitle is-5 has-text-centered">Rules</h5>
                <ol class="p-l-15">
                    <li>Leave a helpful suggestion or constructive criticism.</li>
                    <li>Check existing posts to see if your idea has already been posted.</li>
                    <li>Don't be rude.</li>
                </ol>
            </div>
        )
    }
    settings(){
		let { isRealUser } = this.props.currentUser
        if(isRealUser){
            return (
                <div class="field">  
                    <div class="control">
                        <label class="checkbox is-size-7"> 
                        <input type="checkbox" class="m-r-5" style={{'vertical-align': 'middle'}} 
                        checked={this.state.postAnonymously}
                        onChange={e=>this.setState({ postAnonymously: e.target.checked })}
                        />
                         Post anonymously
                        </label>
                    </div>
                </div>
            )
        }else{
            return (
			<p class="help">
				You will post as anonymous unless you grant this extension your Twitch Id
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
    input() {
        let { minLength, maxLength, suggestion, isLoading } = this.state
        let btnClass = classNames("button is-primary is-small", { 'is-loading': isLoading })
        let { channelName } = this.props.channel
        return (
            <form class="field">
                <div class="control">
                    <textarea class="textarea is-primary" rows="4" 
                            placeholder={`A brilliant suggestion for ${channelName}`} 
                            style={{resize: 'none', overflow:'hidden'}}
                            minlength={minLength}
                            maxlength={maxLength}
                            value={suggestion}
                            onInput={e=>this.setState({suggestion: e.target.value})}
                            required
                    >
                    </textarea>
                </div>
                <div class="flex justify-between p-t-5">
                    <p class="help m-t-0">{this.helpText()}</p>
                    <div class="buttons">    
                        <button class="button is-danger is-outlined is-small"
							type="button"
                            onClick={this.props.onClose}
                        >Cancel</button>
                        <button class={btnClass}
                            disabled={suggestion.length < minLength}
                            onClick={this.onSubmit.bind(this)}
                        >Post</button> 
                    </div>
                </div>
            </form>
        )
    }
    async onSubmit(e){
        e.preventDefault();

        this.setState({ isLoading: true })
        let { suggestion, postAnonymously } = this.state
        Promise.all([
            store.dispatch(postSuggestion(suggestion, postAnonymously)), 
            delay()
        ])
        .then(([status])=>{
            this.setState({ isLoading: false })
			this.props.onSubmitDone(status)
        })
    }
}

export default Form