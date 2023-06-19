'use strict';

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from './configs/spotifyCredentials.js';
import * as params from './configs/spotifyParams.js';
import { checkResponseStatus } from './utils/errors.js';

export const spotifyController = (() => {
  //creates url to get code for obtaining access token
  const _makeRequestURL = () => {
    let url = params.AUTH_URL;
    url += 'client_id=' + SPOTIFY_CLIENT_ID;
    url += '&response_type=code';
    url += '&redirect_uri=' + params.REDIRECT_URI;
    url += '&show_dialog=true';
    url += '&scope=' + encodeURIComponent(params.SCOPES.join(' '));
    return url;
  };

  //returns access token for using API
  const _getAccessToken = async (code) => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET),
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${params.REDIRECT_URI}`,
      });

      checkResponseStatus(response);

      const tokenObj = await response.json();
      return tokenObj;
    } catch (error) {
      console.log(error);
    }
  };

  //returns an ID of current user
  const _getUserId = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      checkResponseStatus(response);

      const userData = await response.json();
      return userData.id;
    } catch (error) {
      console.log(error);
    }
  };

  //creates playlist and returns it's id
  const _createPlaylist = async (token, userId, playlistName) => {
    const requstBody = {
      name: playlistName,
      public: 'true',
    };
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requstBody),
        }
      );

      checkResponseStatus(response);

      const playlistData = await response.json();
      return playlistData.id;
    } catch (error) {
      console.log(error);
    }
  };

  //searches songs by name and artist and returns an array of uris
  const _searchTracks = async (token, tracks) => {
    const headers = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const requests = tracks
      .map((item) => encodeURIComponent(`${item.track} artist:${item.artist}`))
      .map((item) =>
        fetch(
          `https://api.spotify.com/v1/search?q=${item}&type=track&limit=1&offset=0`,
          headers
        )
      );

    return Promise.all(requests)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((items) =>
        items
          .filter((item) => item.tracks.items.length > 0)
          .map((item) => item.tracks.items[0].uri)
      )
      .catch((error) => console.log(error));
  };

  //adds tracks to created playlist
  const _addTracksToPlaylist = async (token, playlistId, trackUris) => {
    const requestBody = {
      uris: trackUris,
    };
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      checkResponseStatus(response);

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    makeRequestURL() {
      return _makeRequestURL();
    },

    getAccessToken(code) {
      return _getAccessToken(code);
    },

    getUserId(token) {
      return _getUserId(token);
    },

    createPlaylist(token, userId, playlistName) {
      return _createPlaylist(token, userId, playlistName);
    },

    searchTracks(token, tracks) {
      return _searchTracks(token, tracks);
    },

    addTracksToPlaylist(token, playlistId, trackUris) {
      return _addTracksToPlaylist(token, playlistId, trackUris);
    },
  };
})();
