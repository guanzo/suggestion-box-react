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
        let generate = ()=> require('axios').post(`/api/channels/${23435553}/suggestions/test`)
        return (
            <button 
            onClick={generate}
            >Gen</button>
        )
    }
}
export default Header;
