import React, { Component } from 'react';
import Input from './Input'
import PostResult from './PostResult'
import { postSuggestion } from '@/store/suggestions'
import { connect } from 'react-redux'
import store from '@/store'
import { userRoles } from '@/store/user' 
import { delay } from '@/util'

class Suggest extends Component {
    constructor(){
        super()
        this.state = {
            isExpanded: false,
            isLoading: false,
            suggestion: '',
            isApproved: true,
            hasSubmitted: false,
            postAnonymously: false
        }
    }
    render() {
        let { isExpanded, hasSubmitted, isApproved } = this.state
        let style = {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: isExpanded ? '100%' : 'auto',
            background: 'white',
            transition: '0.75s'
        }
        let component;
        if(!isExpanded)
            component = this.openFormButton()
        else if(!hasSubmitted)
            component = this.suggestionForm()
        else{
            component = <PostResult 
                            onClose={this.closeForm.bind(this)} 
                            isApproved={isApproved}
                        ></PostResult>
        }
        return (
            <div class="suggest flex-center" style={style}>
                {component}
            </div>
        );
    }
    openFormButton(){
        let {isAnonymousUser} = this.props
        return (
            <div class="has-text-centered">
                {isAnonymousUser ? <p class="help is-danger m-b-5">You must login to leave a suggestion</p> : ''}
                <button class="button is-primary is-small"
                    disabled={isAnonymousUser}
                    onClick={()=>this.setState({ isExpanded: true })}
                >Suggest</button>
            </div>
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
                    <li>Write a helpful suggestion.<br/> This is not a place for arbitrary comments.</li>
                    <li>Check existing suggestions to see if your idea has already been posted.</li>
                    <li>You can provide constructive criticism but don't be rude.</li>
                </ol>
            </div>
        )
    }
    settings(){
        let { isRealUser } = this.props
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
            this.setState({ postAnonymously: true })
            return (<p class="help">You will post as anonymous unless you grant this extension your Twitch Id</p>)
        }
    }
    closeForm(){
        this.setState({ isExpanded: false })
    }
    async onSubmit(e){
        e.preventDefault();

        this.setState({ isLoading: true })

        Promise.all([store.dispatch(postSuggestion(this.state.suggestion)), delay()])
        .then(([suggestion])=>{
            this.setState({ 
                isLoading: false, 
                hasSubmitted: true, 
                isApproved: suggestion.isApproved 
            })
        })
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...userRoles(state)
    }
}
const Suggest_C = connect(mapStateToProps)(Suggest)

export default Suggest_C;
