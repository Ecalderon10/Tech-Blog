const { User } = require("../models");

const userData = [
  {
    username: "Eddy",
    password: "password",
  },
  {
    username: "Berkely",
    password: "Ilovebones",
  },
  {
    username: "Winstion",
    password: "Ilovemykong",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;