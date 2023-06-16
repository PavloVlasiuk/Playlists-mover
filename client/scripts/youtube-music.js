'use strict';

import { queryElements, handleInputURL } from './utils/URLService.js';
import { spotifyController } from '../../server/spotifyController.js';

queryElements.inputField.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    handleInputURL(event);
  }
});

queryElements.inputButton.onclick = (event) => handleInputURL(event);

document.addEventListener('click', (event) => {
  if (event.target.matches('#access-button')) {
    window.location.href = spotifyController.makeRequestURL();
  }
});
