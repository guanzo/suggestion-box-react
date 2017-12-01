import React, { Component } from 'react';

class Suggest extends Component {
    constructor(){
        super()
        this.state = {
            isExpanded: true,
            currentLength: 0,
            maxLength: 100
        }
    }
    render() {
        let component = this.state.isExpanded ? this.postForm() : this.postButton()
        console.log(component)
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
        return (
            <div class="has-text-centered">
                <button class="button is-primary is-small"
                    onClick={this.expandToForm.bind(this)}
                >Suggest</button>
            </div>
        )
    }
    expandToForm(){
        console.log(this)
        this.setState({ isExpanded: true })
    }
    postForm(){
        let { state } = this;
        const style = {
            'padding-left': '15px'
        }
        return (
            <div class="suggestion-form">
                <h5 class="subtitle is-5 has-text-centered">Rules</h5>
                <ol class="is-size-7 m-b-15" style={style}>
                    <li>Write a helpful suggestion.<br/> This is not a place for arbitrary comments.</li>
                    <li>Check existing suggestions to see if your idea has already been posted</li>
                    <li>Be nice. Violators will be dealt with.</li>
                </ol>
                {this.input()} 
                <button class="button is-primary is-small">Suggest</button>
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
                            onInput={e=>this.setState({currentLength: e.target.value.length})}
                    >
                    </textarea>
                </div>
                <p class="help has-text-right">{state.currentLength+'/'+state.maxLength}</p>
            </div>
        )
    }
}



export default Suggest;
