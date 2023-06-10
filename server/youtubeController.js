"use strict";

export const youtubeController = (() => {
  // returns an array of objects that include name of the track and artist
  const _getPlaylistItems = async (apiKey, playlistId) => {
    const requestParameters = {
      part: "snippet%2CcontentDetails",
      playlistId,
      apiKey,

      toString() {
        return `part=${this.part}&playlistId=${this.playlistId}&key=${this.apiKey}`;
      },
    };

    const request = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${requestParameters}`,
      {
        method: "GET",
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
