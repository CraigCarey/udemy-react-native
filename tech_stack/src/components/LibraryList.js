import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';


class LibraryList extends Component {

    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.libraries);
    }

    renderRow(library) {
        return <ListItem library={library} />
    }

    render() {
        return (
            <ListView
                dataSource={this.dataSource}
                renderRow={this.renderRow} />
        );
    }
}

// takes our global state object and maps it to our
// component props
const mapStateToProps = state => {
    return { libraries: state.libraries };
};

// connect() returns a function that we then call with
// LibraryList, this connects the list to the store
export default connect(mapStateToProps)(LibraryList);
