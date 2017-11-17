import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import RegisterForm from "./components/RegisterForm";

export default class App extends Component {

    state = {
        loggedIn: null,
        loginMode: true
    };

    // lifecycle method
    componentWillMount() {

        console.ignoredYellowBox = ['Remote debugger'];

        firebase.initializeApp({
                apiKey: 'AIzaSyCpaepi-xsHtJ0mhT26UILidyV04vFp7dk',
                authDomain: 'auth-78c8a.firebaseapp.com',
                databaseURL: 'https://auth-78c8a.firebaseio.com',
                projectId: 'auth-78c8a',
                storageBucket: 'auth-78c8a.appspot.com',
                messagingSenderId: '519084563262'
            });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderForm() {

        if (this.state.loginMode) {
            return <LoginForm modeSwitcher={this.switchMode.bind(this)}/>;
        }

        return <RegisterForm modeSwitcher={this.switchMode.bind(this)}/>;
    }

    renderContent() {

        const { logOutContainerStyle, spinnerContainerStyle } = styles;

        switch (this.state.loggedIn) {
            case true:
                return (
                    <View style={logOutContainerStyle}>
                        <Button onPress={ () => { firebase.auth().signOut(); }}>
                            Log Out
                        </Button>
                    </View>
                );
            case false:
                return this.renderForm();
            default:
                return(
                    <View style={spinnerContainerStyle}>
                        <Spinner size='large'/>
                    </View>
                );
        }
    }

    switchMode() {
        this.setState({ loginMode: !this.state.loginMode });
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        )
    }
}

const styles = {
    logOutContainerStyle: {
        height: 45
    },
    spinnerContainerStyle: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    }
};
