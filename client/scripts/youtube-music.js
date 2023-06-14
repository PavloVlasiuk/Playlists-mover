'use strict';

import {youtubeController} from "../../server/youtubeController.js";
import {toAuthSpotify} from "../pages/authSpotify.js";

const inputField = document.querySelector(".playlist-url");
const inputButton = document.querySelector("#playlist-button");

const validateURL = (url) => {
  const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/;

  if (!pattern.test(url)) {
    throw new Error("Invalid URL");
    return;
  }
};

const handleInputURL = async (event) => {
  event.preventDefault();
  localStorage.clear();
  try {
    const url = inputField.value;
    validateURL(url);
    const params = new URL(url);
    const playlistId = params.searchParams.get("list");

    localStorage.clear();

    if (playlistId !== null) {
      localStorage.setItem("playlistId", playlistId);
    } else throw new Error("Invalid url");
  } catch (e) {
    console.log(e);
  }

  const playlistId = localStorage.getItem("playlistId");
  const tracks = await youtubeController.getPlaylistItems(playlistId);
  localStorage.setItem("tracks", JSON.stringify(tracks));
  console.log(localStorage.getItem("tracks"));
  toAuthSpotify();
};

inputField.onkeyup = (event) => {
  if (event.keyCode === 13) {
    handleInputURL(event);
  }
};
inputButton.onclick = (event) => handleInputURL(event);
