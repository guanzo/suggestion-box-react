import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchSuggestions } from '@/store/suggestions'

class LoadMore extends Component {
    render() {
        var btn = '';
        if(!this.props.noMorePages){
            btn = <button onClick={this.props.onLoadMore} 
                    class="button is-small"
                    >Load more</button>
        }
        return (
            <div class="flex-center">
                {btn}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        noMorePages: state.pagination.noMorePages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMore: ()=> dispatch(fetchSuggestions())
    }
}
const LoadMore_C = connect(mapStateToProps, mapDispatchToProps)(LoadMore)

export default LoadMore_C;
