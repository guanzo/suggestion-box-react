import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentListPaginatedSuggestions } from '@/store/suggestions'

class LoadMore extends Component {
    render() {
		let { data, hasMorePages } = this.props.suggestions
        const style = {
			visibility: data.length && hasMorePages ? 'visible':'hidden'
		}
        return (
            <div class="flex-center p-a-5" style={style}>
                <button onClick={this.onClick.bind(this)} 
                    class="button is-small"
                    >Load more</button>
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
