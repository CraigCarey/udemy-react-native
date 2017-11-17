import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {

    // lifecycle method
    componentWillMount() {
        firebase.initializeApp({
                apiKey: 'AIzaSyCpaepi-xsHtJ0mhT26UILidyV04vFp7dk',
                authDomain: 'auth-78c8a.firebaseapp.com',
                databaseURL: 'https://auth-78c8a.firebaseio.com',
                projectId: 'auth-78c8a',
                storageBucket: 'auth-78c8a.appspot.com',
                messagingSenderId: '519084563262'
            });
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                <LoginForm />
            </View>
        )
    }
}
