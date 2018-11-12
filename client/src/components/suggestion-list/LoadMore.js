import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentListPaginatedSuggestions } from '@store/suggestions'

class LoadMore extends PureComponent {
    render() {
		let { suggestions, isLoading, hasPaginated } = this.props
		let { data, hasMorePages } = suggestions



		let component;
		if(data.length && hasMorePages){
			component = <button onClick={this.onClick}
							className="button is-small is-white"
						>Show more</button>
		}else if(!isLoading && hasPaginated)//don't show unless user has paginated at least once
			component = <div>All suggestions loaded</div>

        return (
            <div className="flex-center-children p-a-15 is-size-7">
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
