import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';


import App from './components/App';
import Login from './components/Login';

import 'normalize.css';
import './styles/base.css';
import './styles/login.css';
import './styles/newsfeed.css';

var config = {
    apiKey: "AIzaSyCeAaVKTrJ1tNwFnB2J02SwVV5uY1chctk",
    authDomain: "socialize-3bbf1.firebaseapp.com",
    databaseURL: "https://socialize-3bbf1.firebaseio.com",
    projectId: "socialize-3bbf1",
    storageBucket: "socialize-3bbf1.appspot.com",
    messagingSenderId: "979335100606"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        ReactDOM.render(<App firebase = {firebase} user = {user} />, document.getElementById('root'));
    }
    else {
        ReactDOM.render(<Login firebase = {firebase} />, document.getElementById('root'));
    }
});

registerServiceWorker();
