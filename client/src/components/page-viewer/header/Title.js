import React, { Component } from 'react';
import { connect } from 'react-redux'

class Title extends Component {
    render () {
        return (
            <h1 className="title has-text-centered p-a-10 has-text-weight-normal">
                {this.props.title}
            </h1>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		title: state.channel.title
    }
}
export default connect(mapStateToProps)(Title)
