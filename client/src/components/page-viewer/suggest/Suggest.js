import React, { Component } from 'react';
import Input from './Input'
import PostSuggest from './PostSuggest'
import { postSuggestion } from '@/store/suggestions'
import store from '@/store'
import { delay } from '@/util'
import './Suggest.scss'
const { STATUS_APPROVED } = require('@shared/suggestion-util')

class Suggest extends Component {
    constructor(props){
		super(props)
        this.state = {
            isLoading: false,
            suggestion: '',
            status: STATUS_APPROVED,
            hasSubmitted: false,
            postAnonymously: false,
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
    render() {
		let { hasSubmitted, status } = this.state
		let { hasOverlay } = this.props
		console.log(this.props)
        let component;
        if(!hasOverlay)
            component = this.openFormButton()
        else if(!hasSubmitted)
            component = <div class="suggest">
                            {this.suggestionForm()}
                         </div>
        else{
            component = <PostSuggest 
                            onClose={this.closeForm.bind(this)} 
                            status={status}
                        ></PostSuggest>
        }
        return (
            component
        )
    }
    openFormButton(){
		let {isAnonymousUser} = this.props.currentUser
        let style = {
            'border-radius': '9999px',
            position: 'fixed',
            height: 40,
            width: 40,
            right: 25,
            bottom: 10
        }
        return (
            <button class="button is-primary is-small"
                style={style}
                disabled={isAnonymousUser}
                onClick={()=>this.props.toggleOverlay()}
            ><i class="fa fa-comment fa-lg has-text-white"></i></button>
        )
    }
    suggestionForm(){
        return (
            <div class="suggestion-form">
                {this.rules()}
                {this.settings()}
                <Input { ...this.state }
                    onSubmit={this.onSubmit.bind(this)}
                    onInput={e=>this.setState({suggestion: e.target.value})}
                    onCancel={this.closeForm.bind(this)}
                ></Input>
            </div>
        )
    }
    rules(){
        return (
            <div>
                <h5 class="subtitle is-5 has-text-centered">Rules</h5>
                <ol class="is-size-7 m-b-15 p-l-15">
                    <li>Write a helpful suggestion.<br/>Refrain from arbitrary comments.</li>
                    <li>Check existing suggestions to see if your idea has already been posted.</li>
                    <li>You can provide constructive criticism but don't be rude.</li>
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
            return (<p class="help">You will post as anonymous unless you grant this extension your Twitch Id</p>)
        }
    }
    closeForm(){
        this.props.toggleOverlay()
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
            this.setState({ 
                isLoading: false, 
                hasSubmitted: true, 
                status
            })
        })
    }
}

export default Suggest