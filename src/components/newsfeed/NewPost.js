import React, { Component } from 'react';

import Post from './Post';

var firebase;

export default class Posts extends Component {
    constructor(props) {
        super(props);
        firebase = props.firebase;
        this.state = {
            post_content: '',
            imageURL: ''
        }
    }

    getDate() {
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    }

    postData(){
        var post_object = {
            image: this.state.imageURL,
            posted_by: this.props.user,
            text: this.state.post_content,
            time: this.getDate()
        };
        firebase.database().ref('/posts/').push(post_object);
    }
    
    handleImageUrlChange(data) {
        this.setState({
            imageURL: data.target.value
        });
    }

    handlePostDataChange(data) {
        this.setState({
            post_content: data.target.value
        });
    }

    render() {
        var firebase = this.props.firebase;
        return (
            <div className = 'newpost'>  
                <p className = 'new_post_title'>New Post</p>
                <textarea 
                    onChange = {data => this.handlePostDataChange(data)}
                    placeholder = "What's on your mind?" />
                <input 
                    type = "text" 
                    onChange = {data => this.handleImageUrlChange(data)}
                    placeholder = "Image URL" />
                <button onClick = {this.postData.bind(this)} className = 'post_button'>Post</button>
            </div>
        );
    }
}