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
		
        let btnStyle = {
            height: '100%',
			width: '100%',
			transition: '.35s',
			...this.state
		}
		let iconStyle = {//if no transition delay it looks weird..
			transition: '.35s .33s',
			...this.state
		}
		
        return (
			<button className="button is-primary is-small is-floating open-suggestion-form"
                style={btnStyle}
				onClick={this.props.onClick}
            >
				<i className="fa fa-comment fa-lg has-text-white" style={iconStyle}></i>
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
