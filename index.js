require("dotenv").config();

// include dependencies
let express = require("express");
const minify = require("express-minify");
const compression = require("compression");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
let proxy = require("http-proxy-middleware");
let vhost = require("vhost");

let app = express();
let main = express();
main.use(
  "/*",
  proxy({
    target: "https://diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "diga.link": "http://diga.localhost:8000"
    }
  })
);

let sense = express();
sense.use(
  "/*",
  proxy({
    target: "https://sense.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "sense.diga.link": "http://sense.diga.localhost:8000"
    }
  })
);

let research = express();
research.use(
  "/*",
  proxy({
    target: "https://research.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "research.diga.link": "http://research.diga.localhost:8000"
    }
  })
);

let login = express();
login.use(
  "/*",
  proxy({
    target: "https://login.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "login.diga.link": "http://login.diga.localhost:8000"
    }
  })
);

let recruit = express();
recruit.use(
  "/*",
  proxy({
    target: "https://recruit.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "recruit.diga.link": "http://recruit.diga.localhost:8000"
    }
  })
);

let study = express();
study.use(
  "/*",
  proxy({
    target: "https://study.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "study.diga.link": "http://study.diga.localhost:8000"
    }
  })
);

let toby = express();
toby.use(
  "/*",
  proxy({
    target: "https://toby.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "toby.diga.link": "http://192.168.1.165:3000"
    }
  })
);

//Logging
const logStream = rfs("access.log", {
  interval: "1d",
  path: __dirname + "/log"
});
app.use(morgan("combined", { stream: logStream }));

//Compression
app.use(
  compression({
    threshold: 128
  })
);

//app.use(
//  minify({
//    cache: __dirname + "/cache"
//  })
//);

app.use(vhost(process.env.MAIN_HOST, main));
app.use(vhost("www." + process.env.MAIN_HOST, main));
app.use(vhost(process.env.STUDY_HOST, study));
app.use(vhost(process.env.SENSE_HOST, sense));
app.use(vhost(process.env.RECRUIT_HOST, recruit));
app.use(vhost(process.env.LOGIN_HOST, login));
app.use(vhost(process.env.RESEARCH_HOST, research));
app.use(vhost(process.env.TOBY_HOST, toby));

app.listen(process.env.PORT);
