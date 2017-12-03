import React, { Component } from 'react';
import SuggestionList from '@/components/suggestion-list/SuggestionList'
import Suggest from '@/components/page-viewer/suggest/Suggest'

const style = {
    position: 'relative'
}
class Body extends Component {
    render() {
        return (
        <div class="suggestion-body" style={style}>
            <SuggestionList></SuggestionList>
            <Suggest></Suggest>
        </div>
        );
    }
}



export default Body;
