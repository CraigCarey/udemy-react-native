import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class LoadingScreen extends Component {

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Actions.main({ type: 'replace' });
            }
            else {
                Actions.login({ type: 'replace' });
            }
        });
    }

    render() {
        return (null);
    };
}

export default LoadingScreen;
