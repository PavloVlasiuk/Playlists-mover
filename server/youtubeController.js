"use strict";

import { API_KEY, BASE_URL } from "./configs/ytParams.js";

export const youtubeController = (() => {
  // returns an array of objects that include name of the track and artist
  const _getPlaylistItems = async (playlistId) => {
    const requestParameters = {
      maxResults: 50,
      part: "snippet%2CcontentDetails",
      playlistId,

      toString() {
        return `maxResults=${this.maxResults}&part=${this.part}&playlistId=${this.playlistId}&key=${API_KEY}`;
      },
    };

    const request = await fetch(
      `${BASE_URL}/playlistItems?${requestParameters}`,
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
    getPlaylistItems(playlistId) {
      return _getPlaylistItems(playlistId);
    },
  };
})();

console.log(await youtubeController.getPlaylistItems("PLbcKsGBpdBC4h0d3F-d0lF2bwnvjOp6pE"));
