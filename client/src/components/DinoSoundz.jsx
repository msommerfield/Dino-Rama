import React, { Component } from 'react';

import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify(); 

class DinoSoundz extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
        this.state ={
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                image: ''
            }
        }
        if (params.access_token){
            spotifyWebApi.setAccessToken(params.access_token)
        }
      }
      getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
      } 
      getNowPlaying(){
        spotifyWebApi.getMyCurrentPlayPlaybackState()
            .then((response) => {
                this.setState({
                    nowPlaying: {
                        name: response.item.name,
                        image: response.item.album.images[0].url 
                    }
                })
            })
      }
    render() {
        return (
            <div>
                <a href="http://localhost:8888">
                <button>Login with Spotify</button>
                </a>
                <div>Now Playing: { this.state.nowPlaying.name }</div>
                <div>
                    <img src={ this.state.nowPlaying.image} style={{ width: 100}}/>
                </div>
                <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                </button>
            </div>
        );
    }
}

export default DinoSoundz;