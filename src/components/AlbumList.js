import React from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail'

export default class AlbumList extends React.Component
{
    state = { albums: [] };

    componentWillMount() {
        // a call to setState re-renders the component
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({ albums: response.data }));
    }

    renderAlbums() {
        return this.state.albums.map(album =>
            <AlbumDetail key={album.title} album={album} />);
    }

    render() {
        return (
            <View>
                {this.renderAlbums()}
            </View>
        );
    }
}
