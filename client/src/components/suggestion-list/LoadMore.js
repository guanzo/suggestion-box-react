import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentListPaginatedSuggestions } from '@/store/suggestions'

class LoadMore extends Component {
    render() {
		let { data, hasMorePages } = this.props.suggestions
        var btn = '';
        if(data.length && hasMorePages){
            btn = <button onClick={this.onClick.bind(this)} 
                    class="button is-small"
                    >Load more</button>
        }
        return (
            <div class="flex-center p-a-5">
                {btn}
            </div>
        );
	}
	onClick(){
		this.props.onClick()
		this.props.onLoadMore()
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadMore: ()=> dispatch(fetchCurrentListPaginatedSuggestions())
    }
}
const LoadMore_C = connect(null, mapDispatchToProps)(LoadMore)

export default LoadMore_C;
