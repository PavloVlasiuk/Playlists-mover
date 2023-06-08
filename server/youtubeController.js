"use strict";

export const youtubeController = (() => {
  // returns an array of objects that include name of the track and artist
  const _getPlaylistItems = async (token, playlistId) => {
    const requestParameters = {
      part: "snippet%2CcontentDetails",
      playlistId,

      toString() {
        return `part=${this.part}&playlistId=${this.playlistId}`;
      },
    };

    const request = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${requestParameters}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const playlistData = await request.json();

    return playlistData.items.map((item) => {
      let artist = item.snippet.videoOwnerChannelTitle;
      return {
        track: item.snippet.title,
        artist: artist.slice(0, artist.lastIndexOf("-") - 1),
      };
    });
  };

  return {
    getPlaylistItems: _getPlaylistItems,
  };
  
})();
