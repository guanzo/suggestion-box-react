import React, { Component } from 'react';
import { postSuggestion } from '@/store/suggestions'
import { connect } from 'react-redux'
import store from '@/store'
import { userRoles } from '@/store/user' 

class Suggest extends Component {
    constructor(){
        super()
        this.state = {
            isLoading: false,
            isExpanded: false,
            suggestion: '',
            maxLength: 100
        }
    }
    render() {
        let component = this.state.isExpanded ? this.postForm() : this.postButton()
        return (
        <div class="suggest" style={this.style()}>
            {component}
        </div>
        );
    }
    style(){
        return {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: this.state.isExpanded ? '100%' : 'auto',
            background: 'white'
        }
    }
    postButton(){
        let {isAnonymousUser} = this.props
        return (
            <div class="has-text-centered">
                {isAnonymousUser ? <p class="help is-danger">You must login to leave a suggestion</p> : ''}
                <button class="button is-primary is-small"
                    disabled={isAnonymousUser}
                    onClick={()=>this.setState({ isExpanded: true })}
                >Suggest</button>
            </div>
        )
    }
    postForm(){
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
            <div>
                <h5 class="subtitle is-5 has-text-centered">Rules</h5>
                <ol class="is-size-7 m-b-15 p-l-15">
                    <li>Write a helpful suggestion.<br/> This is not a place for arbitrary comments.</li>
                    <li>Check existing suggestions to see if your idea has already been posted.</li>
                    <li>Be nice. Violators will be dealt with.</li>
                </ol>
            </div>
        )
    }
    settings(){

        return (
            <div class="field">  
                <div class="control">
                    <label class="checkbox is-size-7"> 
                    <input type="checkbox" class="m-r-5" style={{'vertical-align': 'middle'}} />
                     Post anonymously
                    </label>
                </div>
            </div>
        )
    }
    input(){
        let { state } = this;
        return (
            <div class="field">
                <div class="control">
                    <textarea class="textarea is-primary" rows="4" 
                            placeholder="A brilliant suggestion..." 
                            style={{resize: 'none', overflow:'hidden'}}
                            maxLength={state.maxLength}
                            value={state.suggestion}
                            onInput={e=>this.setState({suggestion: e.target.value})}
                    >
                    </textarea>
                </div>
                <div class="flex justify-between p-t-5">
                    <p class="help m-t-0">{state.suggestion.length+'/'+state.maxLength}</p>
                    <div class="buttons">    
                        <button class="button is-danger is-outlined is-small"
                            onClick={()=>this.setState({ isExpanded: false })}
                        >Cancel</button>
                        <button class="button is-primary is-small"
                            disabled={state.suggestion.length === 0}
                            onClick={this.onSubmit.bind(this)}
                        >Post</button> 
                    </div>
                </div>
            </div>
        )
    }
    onSubmit(){
        let result = store.dispatch(postSuggestion(this.state.suggestion))
        console.log(result)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...userRoles(state)
    }
}
const Suggest_C = connect(mapStateToProps)(Suggest)

export default Suggest_C;
