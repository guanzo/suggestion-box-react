import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentListPaginatedSuggestions } from '@/store/suggestions'

class LoadMore extends PureComponent {
    render() {
		let { data, hasMorePages } = this.props.suggestions
        const style = {
			visibility: data.length && hasMorePages ? 'visible':'hidden'
		}
        return (
            <div className="flex-center p-a-5" style={style}>
                <button onClick={this.onClick} 
                    className="button is-small"
                    >Load more</button>
            </div>
        );
	}
	onClick = ()=>{
		this.props.onClick()
		this.props.onLoadMore()
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadMore: ()=> dispatch(fetchCurrentListPaginatedSuggestions())
    }
}
export default connect(null, mapDispatchToProps)(LoadMore)

