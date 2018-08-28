import React, { Component } from 'react';

var image;

export default class MiniProfile extends Component {

    constructor(props) {
        super(props);

        if(this.props.user.photoURL) {
            image = this.props.user.photoURL;
        }
        else {
            image = require('./../../images/default.jpg');
        }

        this.state = {
            image: image,
            imageURL: ''
        }
    }

    logout() {
        this.props.firebase.auth().signOut();
    }

    updateDP() {
        this.props.user.updateProfile({
            photoURL: this.state.imageURL
        });

        this.setState({
            image: this.state.imageURL
        });
    }

    handleDataChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className = 'miniProfileContainer'> 
                <div className = 'miniProfile'>
                    <img className = 'profile_picture' src ={this.state.image} />
                    <p className = 'profileName'>
                        Hello {this.props.user.displayName}!
                    </p>
                </div>
                <div className = 'updateDP'>
                    <input 
                        name = 'imageURL'
                        onChange = {e => this.handleDataChange(e)}
                        type = 'text' 
                        placeholder = 'Type Profile Picture Image URL' />
                    <p className = 'updateDPButton' onClick = {this.updateDP.bind(this)}>Update Profile Picture</p>
                </div>
                <p onClick = {this.logout.bind(this)} className = 'logout'>Logout</p>
            </div>
        );
    }
}