import React, { Component } from 'react';
import { connect } from 'react-redux'

class Title extends Component {
    render () {
        const style = { fontSize: this.props.titleFontSize + 'px' }
        return (
            <h1 className="title has-text-centered p-a-10 has-text-weight-normal"
                style={style}>
                {this.props.title}
            </h1>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const title = 'title' in ownProps ? ownProps.title : state.channel.title
    const titleFontSize = 'titleFontSize' in ownProps
        ? ownProps.titleFontSize
        : state.channel.titleFontSize
	return {
        title,
        titleFontSize
    }
}
export default connect(mapStateToProps)(Title)
