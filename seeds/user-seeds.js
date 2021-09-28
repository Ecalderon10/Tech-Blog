const { User } = require("../models");

const userData = [
  {
    username: "Eddy",
    password: "password",
  },
  {
    username: "Berkeley",
    password: "Ilovebones",
  },
  {
    username: "Winston",
    password: "Ilovemykong",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;