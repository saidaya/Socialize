import React, { Component } from 'react';

import Post from './Post';
import NewPost from './NewPost';

var firebase;

export default class Posts extends Component {
    constructor(props) {
        super(props);
        firebase = props.firebase;
        this.state = {
            posts_data: []
        }
    }

    componentDidMount(){
        firebase.database()
        .ref('/posts/')
        .once('value')
        .then((snapshot) => this.setPostsData(snapshot));
    }

    setPostsData(snapshot) {
        this.setState({
            posts_data: snapshot.val()
        });
    }

    render() {
        var firebase = this.props.firebase;
        var posts_data = this.state.posts_data;
        var displayName = this.props.user;
        return (
            <div className = 'posts'>  
                <NewPost 
                    user = {displayName}
                    firebase = {firebase}/>
                {Object.keys(this.state.posts_data).reverse().map(function(key) {
                    var data = posts_data[key];
                    return (
                        <Post 
                            key = {key}
                            id = {key}
                            firebase = {firebase}
                            author = {data.posted_by}
                            time = {data.time}
                            content = {data.text}
                            image = {data.image}
                            likes = {data.liked_by}
                            user = {displayName} />
                    );
                })}
            </div>
        );
    }
}