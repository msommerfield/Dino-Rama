import React, { Component } from 'react';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyWebApi = new SpotifyWebApi();

class DinoSoundz extends Component {
        constructor(){
          super();
          const params = this.getHashParams();
          const token = params.access_token;
          
          this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { name: 'Not Checked', albumArt: '' }
          }
        }
      if (token) {
            spotifyWebApi.setAccessToken(token);
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
        spotifyWebApi.getMyCurrentPlaybackState()
          .then((response) => {
            this.setState({
              nowPlaying: { 
                  name: response.item.name, 
                  albumArt: response.item.album.images[0].url
                }
            });
          })
      }
    render() {
        return (
            <div>
                <a href="http://localhost:8888/">
                <button>Login with Spotify</button>
                </a>
                    <div>
                        Now Playing: { this.state.nowPlaying.name }
                    </div>
                <div>
                    <img src={this.state.nowPlaying.albumArt}/>
                </div>
                { this.state.loggedIn && 
                <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                </button>
                }
            </div>
        );
    }
}

export default DinoSoundz;