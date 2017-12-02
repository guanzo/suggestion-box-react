import React, { Component } from 'react';
import moment from 'moment'
import classNames from 'classnames'
import './Suggestion.scss'

class Suggestion extends Component {
    render() {
        let { text, user } = this.props
        let { id, opaqueId } = user
        return (
            <div class="suggestion m-b-10">
                <div class="suggestion-header is-size-7 m-b-5">
                    <div class="profile-img m-r-5 flex-center">
                        {this.img()}
                    </div>
                    <div>
                        <div>{this.name()}</div>
                        <div class="suggestion-date">{this.date()}</div>
                    </div>
                </div>
                <p class="suggestion-text m-b-5">{text}</p>
                {this.toolbar()}
            </div>
        );
    }
    img(){
        let { postAnonymously, user } = this.props
        return postAnonymously 
        ? <i class="fa fa-user-circle-o fa-2x"></i> 
        : <img src={user.profileImg} />
    }
    name(){
        let { user, postAnonymously } = this.props
        return postAnonymously ? 'Anonymous' : user.name
    }
    date(){
        let date = moment(this.props.createdAt)
        let year = date.year()
        let currentYear = moment().year()
        let fmt = 'MMM D'
        if(year !== currentYear)
            fmt += ' YYYY'
        return date.format(fmt)
    }
    toolbar(){
        let { votes } = this.props
        let thumbsClass = classNames('fa fa-thumbs-o-up m-r-5',
        { 
            'has-text-success': votes.length > 0 
        })
        return (
            <div class="suggestion-toolbar">
                <div class="flex">
                    <i class={thumbsClass}></i>
                    <div class="is-size-7">{votes.length.toLocaleString()}</div>
                </div>
            </div>
        )
    }
}
export default Suggestion;
