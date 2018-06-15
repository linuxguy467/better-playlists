import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
  user: {
    name: 'Matthew',
    playLists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Beat It', duration: 1345},
          {name: 'I am one', duration: 1236},
          {name: 'Jimmy Dance', duration: 70000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Beat It', duration: 1345},
          {name: 'I am one', duration: 1236},
          {name: 'Jimmy Dance', duration: 70000}
        ]
      },
      {
        name: 'Another playlist - the best!',
        songs: [
          {name: 'Beat It', duration: 1345},
          {name: 'I am one', duration: 1236},
          {name: 'Jimmy Dance', duration: 70000}
        ]
      },
      {
        name: 'Playlist!',
        songs: [
          {name: 'Beat It', duration: 1345},
          {name: 'I am one', duration: 1236},
          {name: 'Jimmy Dance', duration: 70000}
        ]
      }
    ]
  }
};

class PlayListCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: '40%', marginTop: '3rem', display: 'inline-block' }}>
        <h2>{this.props.playlists && this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}
class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, playlist) => songs.concat(playlist.songs), []);
    let totalDuration = allSongs.reduce((sum, song) => sum + song.duration, 0);
    return (
      <div style={{ ...defaultStyle, width: '40%', marginTop: '3rem', display: 'inline-block' }}>
        <h2>{Math.round(totalDuration / 3600)} Hours</h2>
      </div>
    );
  }
}
class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img src="" alt="" />
        <input type="text" style={{margin: '1.2rem'}} onKeyUp={event => this.props.onTextChange(event.target.value)} />
      </div>
    );
  }
}
class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
        <img src={playlist.imageUrl} alt="Playlist image" style={{width: '30%'}}/>
        <h3>{playlist.name}</h3>
        <ul style={{marginTop: '1.5rem', listStyle: 'none'}}>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': `Bearer ${accessToken}`}
    })
    .then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': `Bearer ${accessToken}`}
    })
    .then(response => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        console.log(data.items);
        return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: []
        }
      })
    }))
  }
  render() {
    let playlistsToRender =
    (this.state.user &&
    this.state.playlists)
    ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
      ) : []
    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, fontSize: '4.8rem'}}>
            {this.state.user.name}'s Playlists
          </h1>
          <PlayListCounter playlists={playlistsToRender} />
          <HoursCounter playlists={playlistsToRender} />
          <Filter onTextChange={text => this.setState({filterString: text})} />
          {playlistsToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )}
        </div> : <button onClick={() => window.location='http://localhost:8888/login'} 
        style={{padding: '2rem', fontSize: '5rem', marginTop: '2rem'}}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
