import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import Header from './Header';
import NewsFeed from './NewsFeed';

var firebase;

export default class App extends Component {

    constructor(props) {
        super(props);

        firebase = props.firebase;
    }

    render() {
        return (
            <div className='container'>    
                <Header />
                <NewsFeed 
                    user = {this.props.user}
                    firebase = {firebase}/>
            </div>
        );
    }
}