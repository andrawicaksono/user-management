const { User } = require("../models");

const { UserRepository } = require("./user");

module.exports = {
    UserRepository: UserRepository(User)
}