import React, { Component } from 'react';

import MiniProfile from './newsfeed/MiniProfile';
import Posts from './newsfeed/Posts';

export default class NewsFeed extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className = 'newsFeed'>  
                <MiniProfile 
                    firebase = {this.props.firebase}
                    user = {this.props.user}/>
                <Posts 
                    user = {this.props.user.displayName}
                    firebase = {this.props.firebase}/>
            </div>
        );
    }
}