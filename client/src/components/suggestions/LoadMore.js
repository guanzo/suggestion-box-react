import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchSuggestions } from '@/store/suggestions'

class LoadMore extends Component {
    render() {
        return (
            <div class="flex-center">
                <button onClick={this.props.onLoadMore} 
                    class="button is-small"
                >Load more</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMore: ()=> dispatch(fetchSuggestions())
    }
}
const LoadMore_C = connect(null, mapDispatchToProps)(LoadMore)

export default LoadMore_C;
