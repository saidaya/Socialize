import React, { Component } from 'react';


var firebase;

export default class Post extends Component {

    constructor(props) {
        super(props);
        firebase = props.firebase;
        if(props.likes) {
            this.state = {
                likes: props.likes,
                liked_by: '',
                like_image: require('../../images/like.png'),
                like_onClick: this.like.bind(this)
            };
        }
        else {
            this.state = {
                likes: {},
                liked_by: '',
                like_image: require('../../images/like.png'),
                like_onClick: this.like.bind(this)
            };
        }
    }

    componentDidMount() {
        if(this.props.likes){
            this.getLikes(this.state.likes);
        }
    }

    like() {
        var reference = '/posts/' + this.props.id + '/liked_by/';
        var username = this.props.user;
        firebase.database().ref(reference).push(username);
        var liked = Object.values(this.state.likes);
        liked.push(username);
        this.getLikes(liked);
        this.setState({
            likes: liked
        });
    }

    unlike() {
        var username = this.props.user;
        var reference = '/posts/' + this.props.id + '/liked_by/';
        firebase.database().ref(reference).orderByValue().equalTo(username).once('child_added').then(function(snapshot) {
            snapshot.ref.remove();
        });
        var liked = Object.values(this.state.likes);
        liked.splice(liked.indexOf(username), 1);
        this.getLikes(liked);
        this.setState({
            likes: liked
        });
    }

    getLikes(likes_object) {
        var liked_by = '';
        var liked = false;
        var username = this.props.user;
        var likesCount = Object.values(likes_object).length;
        Object.values(likes_object).map(function(data, index) {
            if(data == username) {
                liked = true;
            }
            if(index <= 2) {
                if(index == likesCount - 1 || index == 2) {
                    liked_by = liked_by + data;
                }
                else {
                    liked_by = liked_by + data + ', ';
                }
            }
        });

        if(likesCount > 3) {
            liked_by = liked_by + ' and ' + (likesCount - 3) + ' others';
        }

        if(liked) {
            this.setState({
                liked_by: liked_by,
                like_image: require('../../images/unlike.png'),
                like_onClick: this.unlike.bind(this)
            });
        }
        else {
            this.setState({
                liked_by: liked_by,
                like_image: require('../../images/like.png'),
                like_onClick: this.like.bind(this)
            });
        }
    }

    render() {
        return (
            <div className = 'post'>  
                <div className = 'post_metadata'>
                    <img src = {require('../../images/default.jpg')} />
                    <div className = 'post_details'>
                        <p className = 'post_author'>{this.props.author}</p>
                        <p className = 'posted_time'>Posted on {this.props.time}</p>
                    </div>
                </div>
                <div className = 'post_data'>
                    <p>{this.props.content}</p>
                    <img src = {this.props.image} />
                </div>
                <div className = 'likes'>
                    <img
                        onClick = {this.state.like_onClick}
                        src = {this.state.like_image} />
                    <p ref = 'likes'>
                        {this.state.liked_by}
                    </p>
                </div>
            </div>
        );
    }
}