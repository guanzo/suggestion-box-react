import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentListPaginatedSuggestions } from '@/store/suggestions'

class LoadMore extends PureComponent {
    render() {
		let { suggestions, isLoading } = this.props
		let { data, hasMorePages } = suggestions
		
		let component;
		if(data.length && hasMorePages){
			component = <button onClick={this.onClick} 
							className="button is-small is-info is-inverted"
						>Load more</button>
		}else if(!isLoading)
			component = <div className="has-text-info">All suggestions loaded</div>

        return (
            <div className="flex-center p-a-5 is-size-7">
				{component}
			</div>
        )
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

