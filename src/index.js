//To accept self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const APP_PORT = 3000;

//Server
const express = require("express");
const app = express();
const logger = require("morgan");
const { normalLog } = require("@oaas-hg/utils");

//Parse JSON using express
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(
  logger(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]`
  )
);

app.listen(APP_PORT, async () => {
  normalLog(`Server listening on port ${APP_PORT}`);
  app.use("/time", require("./routes/time.js"));
});
