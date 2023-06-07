"use strict";

export const youtubeController = (() => {
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

    return playlistData;
  };

  return {
    getPlaylistItems: _getPlaylistItems,
  };
  
})();
