import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchSuggestions } from '@/store/suggestions'

class LoadMore extends Component {
    render() {
        var btn = '';
        if(this.props.suggestions.hasMorePages){
            btn = <button onClick={this.props.onLoadMore} 
                    class="button is-small"
                    >Load more</button>
        }
        return (
            <div class="flex-center p-a-5">
                {btn}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadMore: ()=> dispatch(fetchSuggestions())
    }
}
const LoadMore_C = connect(null, mapDispatchToProps)(LoadMore)

export default LoadMore_C;
