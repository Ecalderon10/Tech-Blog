
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const PORT = process.env.PORT || 3006;
const helpers = require ('./utils/helper')
const hbs = exphbs.create({helpers});


const sesh = {
  secret: "secret session",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
  db: sequelize,
  }),
};

app.use(session(sesh));


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);


console.log(
  `Database name: ${sequelize.config.database} \n running on port: ${sequelize.config.port} \n under hostname: ${sequelize.config.host}`
);


sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port: http://localhost:${PORT}`));
});