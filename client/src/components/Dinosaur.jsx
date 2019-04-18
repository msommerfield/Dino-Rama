import React, {Component} from 'react';
import axios from 'axios';
// import styled from 'styled-components';

// const StyledLink = styled(Link)`
//   color: palevioletred;
//   font-weight: bold;
//   text-decoration: none;
// `;

class Dinosaur extends Component {

    state = {
            dinosaur: {
                
            },
            songs: [],
    }

    componentDidMount() {
        const artistId = this.props.match.params.id;
        this.fetchArtist(artistId)
    }

    fetchArtist = async (artistId) => {
        try {
            const artistResponse = await axios.get(`/api/v1/artists/${artistId}`)
            this.setState({
                artist: artistResponse.data,
                songs: artistResponse.data.songs,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    render() {
        return (
            <div>
                <img src={this.state.artist.photo_url} alt=""/>
                <h1>{this.state.artist.name}</h1>
                {this.state.songs.map(song => (
                    <div key={song.id}>
                        <h4>{song.title}</h4>
                        <audio controls src={song.preview_url}></audio>
                    </div>
                ))}
            </div>
        );
    }
}

export default Dinosaur;