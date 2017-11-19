import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';

class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyBY0XPQLb4mJm7ZHGz2-8VtRGjefU9yAcg',
            authDomain: 'manager-a3ced.firebaseapp.com',
            databaseURL: 'https://manager-a3ced.firebaseio.com',
            projectId: 'manager-a3ced',
            storageBucket: 'manager-a3ced.appspot.com',
            messagingSenderId: '48053933526' };

          firebase.initializeApp(config);
    }


    render() {
        return (
                <Provider store={createStore(reducers)}>
                <View>
                    <Text>
                        Hula
                    </Text>
                </View>
            </Provider>
        );
    }
}

export default App;
