import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import Header from './Header';

var firebase;

var registration = false;

export default class App extends Component {

    constructor(props) {
        super(props);

        firebase = props.firebase;

        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: '',
            successMessage: '',
            currentScreen: 'Login'
        }
        // firebase.auth().signOut();
        firebase.auth().onAuthStateChanged(user => this.handleAuthChange(user));
    }

    handleAuthChange(user){
        if(user && registration) {
            user.updateProfile({
                displayName: this.state.name
            });
        }
        else if(user && !registration){
            
        }
    }

    handleErrorMessage(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({
            errorMessage: errorMessage
        });
    }

    handleSuccess(data) {
        firebase.auth().signOut();
    }

    register() {
        registration = true;
        var email = this.state.email;
        var password = this.state.password;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => this.handleSuccess(data))
        .catch(error => this.handleErrorMessage(error));
    }

    login() {
        registration = false;
        var email = this.state.email;
        var password = this.state.password;
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.handleErrorMessage(error));
    }

    handleDataChange(data) {
        this.setState({
            [data.target.name]: data.target.value
        });
    }

    renderErrorIf(errorMessage){
        if(errorMessage != '') {
            return (
                <p className = 'errorMessage'>{errorMessage}</p>
            );
        }
    }

    renderSuccessIf(successMessage) {
        if(successMessage != '') {
            return(
                <p className = 'successMessage'>{successMessage}</p>
            );
        }
    }

    showRegister(){
        return(
            <div className = 'loginContainer'>
                <div className = "login">
                    <p>Register</p>
                    {this.renderErrorIf(this.state.errorMessage)}
                    {this.renderSuccessIf(this.state.successMessage)}
                    <input 
                        name = 'name'
                        onChange = {data => this.handleDataChange(data)}
                        type = 'text'
                        placeholder = 'Name' />
                    <input 
                        name = 'email'
                        onChange = {data => this.handleDataChange(data)} 
                        type = "email" 
                        placeholder = 'Email ID' />
                    <input
                        name = 'password'
                        onChange = {data => this.handleDataChange(data)} 
                        type = "password" 
                        placeholder = 'Password'/>
                    <button
                        onClick = {this.register.bind(this)}>Register</button>
                    <p 
                        onClick = {this.changeCurrentScreenLogin.bind(this)}
                        className = 'navigate_link'>
                        Login Here
                    </p>
                </div>
            </div>
        );
    }

    showLogin(){
        return(
            <div className = 'loginContainer'>
                <div className = "login">
                    <p>Login</p>
                    {this.renderErrorIf(this.state.errorMessage)}
                    {this.renderSuccessIf(this.state.successMessage)}
                    <input 
                        name = 'email'
                        onChange = {data => this.handleDataChange(data)} 
                        type = "email" 
                        placeholder = 'Email ID' />
                    <input
                        name = 'password'
                        onChange = {data => this.handleDataChange(data)} 
                        type = "password" 
                        placeholder = 'Password'/>
                    <button
                        onClick = {this.login.bind(this)}>Login</button>
                    <p 
                        onClick = {this.changeCurrentScreenRegister.bind(this)}
                        className = 'navigate_link'>
                        Register Here
                    </p>
                </div>
            </div>
        );
    }

    changeCurrentScreenLogin(currentScreen){
        this.setState({
            currentScreen: 'Login'
        });
    }

    changeCurrentScreenRegister(currentScreen){
        this.setState({
            currentScreen: 'Register'
        });
    }

    renderLoginOrRegister(currentScreen){
        if(currentScreen == 'Login') {
            return this.showLogin();
        }
        else {
            return this.showRegister();
        }
    }

    render() {
        return (
            <div className='container'>    
                <Header />
                {this.renderLoginOrRegister(this.state.currentScreen)}
            </div>
        );
    }
}