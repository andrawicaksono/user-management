const { 
    AuthService, 
    AdminService 
} = require("../services");

const { AdminController } = require("./admin");
const { AuthController } = require("./auth");
const { CheckController } = require("./check");


module.exports = {
    CheckController: CheckController(),
    AuthController: AuthController(AuthService),
    AdminController: AdminController(AdminService)
}