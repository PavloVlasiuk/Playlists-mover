"use strict";

export const spotifyController = (() => {
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

  return {
    getUserId: _getUserId,

    createPlaylist: _createPlaylist,
  };
  
})();
