import React, { Component } from 'react';
import Suggestions from '@/components/suggestions/Suggestions'
import Suggest from '@/components/page-viewer/suggest/Suggest'

const style = {
    position: 'relative',
    height: '100%'
}
class Body extends Component {
    render() {
        return (
        <div class="suggestion-body" style={style}>
            <Suggestions></Suggestions>
            <Suggest></Suggest>
        </div>
        );
    }
}



export default Body;
