import React, { Component } from 'react';

//Material design floating action button
class Fab extends Component {
	constructor(){
		super()
		this.state = {
			opacity: 1,
			transition: '.35s .33s',
		}
	}
    render() {
        let style = {
            height: 40,
			width: 40,
        }
        return (
			<button class="button is-primary is-small is-floating open-suggestion-form"
                style={style}
				onClick={this.props.onClick}
            >
				<i class="fa fa-comment fa-lg has-text-white" style={{ ...this.state}}>
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
