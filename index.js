require("dotenv").config();

// include dependencies
let express = require("express");
let proxy = require("http-proxy-middleware");
let vhost = require("vhost");

let app = express();
let main = express();
main.use(
  "/*",
  proxy({
    target: "http://diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "diga.link:80": "http://diga.link:8000"
    }
  })
);

let sense = express();
sense.use(
  "/*",
  proxy({
    target: "http://sense.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "sense.diga.link:80": "http://sense.diga.link:8000"
    }
  })
);

let research = express();
research.use(
  "/*",
  proxy({
    target: "http://research.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "research.diga.link:80": "http://research.diga.link:8000"
    }
  })
);

let login = express();
login.use(
  "/*",
  proxy({
    target: "http://login.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "login.diga.link:80": "http://login.diga.link:8000"
    }
  })
);

let recruit = express();
recruit.use(
  "/*",
  proxy({
    target: "http://recruit.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "recruit.diga.link:80": "http://recruit.diga.link:8000"
    }
  })
);

let study = express();
study.use(
  "/*",
  proxy({
    target: "http://study.diga.link",
    changeOrigin: true,
    ws: true,
    router: {
      "study.diga.link:80": "http://study.diga.link:8000"
    }
  })
);

app.use(vhost(process.env.MAIN_HOST, main));
app.use(vhost("www." + process.env.MAIN_HOST, main));
app.use(vhost(process.env.STUDY_HOST, study));
app.use(vhost(process.env.SENSE_HOST, sense));
app.use(vhost(process.env.RECRUIT_HOST, recruit));
app.use(vhost(process.env.LOGIN_HOST, login));
app.use(vhost(process.env.RESEARCH_HOST, research));

app.listen(process.env.PORT);
