'use strict';

import http from 'http';
import { PORT, HOSTNAME } from '../configs/serverConfigs.js';
import { router } from './storageController.js';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  router(req, res);
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Listening to http://${HOSTNAME}:${PORT}`);
});
