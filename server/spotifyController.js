"use strict";

export const spotifyController = (() => {
  //returns an ID of current user
  const _getUserId = async (token) => {
    const request = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const userData = await request.json();
    return userData.id;
  };

  //creates playlist and returns it's id
  const _createPlaylist = async (token, userId, playlistName) => {
    const requstBody = {
      name: playlistName,
      public: "true",
    };

    const request = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requstBody),
      }
    );

    const playlistData = await request.json();
    return playlistData.id;
  };

  //searches songs by name and artist and returns an array of uris
  const _searchTracks = async (token, tracks) => {
    const headers = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
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
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((items) => items.map((item) => item.tracks.items[0].uri));
  };

  //adds tracks to created playlist
  const _addTracksToPlaylist = async (token, playlistId, trackUris) => {
    const requestBody = {
      uris: trackUris,
    };

    const request = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const response = await request.json();
    return response;
  };

  return {
    getUserId: _getUserId,

    createPlaylist: _createPlaylist,

    searchTracks: _searchTracks,

    addTracksToPlaylist: _addTracksToPlaylist,
  };
})();
