'use strict';

import {hideMessage, showMessage} from "../invalidUrl.js";
import {youtubeController} from "../../../server/youtubeController.js";
import {storage} from "../../../server/storageRequests.js";
import {toAuthSpotify} from "../../pages/authSpotifyPage.js";

export const queryElements = {
  inputField: document.querySelector(".playlist-url"),
  inputButton: document.querySelector("#playlist-button"),
};

const validateURL = (url) => {
  const patternURL = /^(https?:\/\/)?music\.youtube\.com\/playlist\?list=([A-Za-z0-9_-]+)&feature=share$/;

  if (!patternURL.test(url)) {
    throw new Error("Invalid URL");
    return;
  }
};

const getURLParam = (url, param) => {
  const params = new URL(url);
  return params.searchParams.get(param);
};

export const handleInputURL = async (event) => {
  event.preventDefault();
  hideMessage();

  try {
    const url = queryElements.inputField.value;
    validateURL(url);

    const playlistId = getURLParam(url, "list");
    const tracks = await youtubeController.getPlaylistItems(playlistId);

    await storage.setData(tracks);

    toAuthSpotify();
  } catch (error) {
    showMessage()
    console.log(error);
  }
};