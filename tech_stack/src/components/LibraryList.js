import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';


class LibraryList extends Component {
    render() {
        console.log(this.props);
        return <View />;
    }
}

// takes our global state object and maps it to our
// component props
const mapStateToProps = state => {
    console.log(state);

    return { libraries: state.libraries };
};

// connect() returns a function that we then call with
// LibraryList, this connects the list to the store
export default connect(mapStateToProps)(LibraryList);
