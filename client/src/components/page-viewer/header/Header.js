import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div class="suggestion-header">
                <h1 class="title has-text-centered">Suggestion Box</h1>
                <div>{this.toolbar()}</div>
            </div>
        );
    }
    toolbar(){
        let test = '';
        if(process.env.NODE_ENV === 'development')
            test = this.testBtn()
        return test
    }
    testBtn(){
        let style = {
            position: 'absolute',
            top: 0,
            right: 0
        }
        let generate = ()=> require('axios').post(`/api/channels/${23435553}/suggestions/test`)
        return (
            <button style={style} onClick={generate}>g</button>
        )
    }
}
export default Header;
