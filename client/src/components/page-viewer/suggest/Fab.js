import React, { Component } from 'react';

//Material design floating action button
class Fab extends Component {
	constructor(){
		super()
		this.state = {
			opacity: 1,
		}
	}
    render() {
        let style = {
            height: 40,
			width: 40,
			transition: '.35s .33s',
			...this.state
        }
        return (
			<button className="button is-primary is-small is-floating open-suggestion-form"
                style={style}
				onClick={this.props.onClick}
            >
				<i className="fa fa-comment fa-lg has-text-white">
				</i>
			</button>
        );
	}
	componentWillMount(){
		this.setState({ opacity: 0 })
	}
	componentDidMount(){
		setTimeout(()=>this.setState({ opacity: 1 }), 0)
	}
}



export default Fab;
