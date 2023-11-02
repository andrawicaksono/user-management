const { UserRepository } = require("../repositories");

const { AdminService } = require("./admin");
const { AuthService } = require("./auth");

module.exports = {
    AuthService: AuthService(UserRepository),
    AdminService: AdminService(UserRepository)
}