"use strict";

import http from "http";
import { PORT, HOSTNAME } from "../configs/serverConfigs.js";
import { router } from "./storageController.js";

const server = http.createServer(router);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Listening to http://${HOSTNAME}:${PORT}`);
});
