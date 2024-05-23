import { Server } from "http";
import app from "./app.js";

const http = Server(app);

// start the http server
http.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});
