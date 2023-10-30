const { UserRepository } = require("../repositories");

const { AuthService } = require("./auth");

module.exports = {
    AuthService: AuthService(UserRepository)
}