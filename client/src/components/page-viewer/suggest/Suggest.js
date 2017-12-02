import React, { Component } from 'react';
import Input from './Input'
import PostSuggest from './PostSuggest'
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
            postAnonymously: false,
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
            component = <div class="suggest flex-center" style={style}>
                            {this.suggestionForm()}
                         </div>
        else{
            component = <PostSuggest 
                            onClose={this.closeForm.bind(this)} 
                            isApproved={isApproved}
                        ></PostSuggest>
        }
        return (
            component
        )
    }
    openFormButton(){
        let {isAnonymousUser} = this.props
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
                onClick={()=>this.setState({ isExpanded: true })}
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
        let { suggestion, postAnonymously } = this.state
        Promise.all([
            store.dispatch(postSuggestion(suggestion, postAnonymously)), 
            delay()
        ])
        .then(([isApproved])=>{
            this.setState({ 
                isLoading: false, 
                hasSubmitted: true, 
                isApproved
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
