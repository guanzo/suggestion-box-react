import React, { Component } from 'react';
import classNames from 'classnames'

class Input extends Component {
    constructor(){
        super()
        this.state = {
            minLength: 15,
            maxLength: 100,
        }
    }
    helpText(){
        let { minLength, maxLength } = this.state
        let length = this.props.suggestion.length
        if(length === 0)
            return `Enter at least ${minLength} characters`
        else if(length < minLength)
            return `${minLength - length} more to go...`
        else
            return length+'/'+maxLength
    }
    render() {
        let { minLength, maxLength } = this.state
        let { suggestion, isLoading } = this.props
        let btnClass = classNames("button is-primary is-small", { 'is-loading': isLoading })
        
        return (
            <form class="field">
                <div class="control">
                    <textarea class="textarea is-primary" rows="4" 
                            placeholder="A brilliant suggestion..." 
                            style={{resize: 'none', overflow:'hidden'}}
                            minlength={minLength}
                            maxlength={maxLength}
                            value={suggestion}
                            onInput={this.props.onInput}
                            required
                    >
                    </textarea>
                </div>
                <div class="flex justify-between p-t-5">
                    <p class="help m-t-0">{this.helpText()}</p>
                    <div class="buttons">    
                        <button class="button is-danger is-outlined is-small"
							type="button"
                            onClick={this.props.onCancel}
                        >Cancel</button>
                        <button class={btnClass}
                            disabled={suggestion.length < minLength}
                            onClick={this.props.onSubmit}
                        >Post</button> 
                    </div>
                </div>
            </form>
        )
    }
}
export default Input;
