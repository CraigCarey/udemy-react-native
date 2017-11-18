import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers'; // index.js is implied
import { Header } from './components/common';
import LibraryList from './components/LibraryList'

const App = () => {

        console.ignoredYellowBox = ['Remote debugger'];

        return (
        <Provider store={createStore(reducers)}>
            <View style={{ flex: 1 }}>
                <Header headerText={"Tech Stack"} />
                <LibraryList />
            </View>
        </Provider>
    );
};

export default App;
