const { ResponseFormatter } = require("../helpers");

module.exports.AuthController = (AuthService) => {
    return {
        register: async (req, res, next) => {
            try {
                const {
                    email,
                    password,
                    first_name,
                    last_name,
                } = req.body
        
                const data = {
                    email,
                    password,
                    first_name,
                    last_name,
                }
        
                const [, errUser] = await AuthService.register(data);
                if (errUser) throw errUser;
        
                return res.status(200).send({
                    status: 200,
                    iserror: false,
                    message: "register success",
                });
            } catch (err) {
                next(err)
            }
        },

        login: async (req, res, next) => {
            try {
                const {email, password} = req.body;
        
                let data = {
                    email,
                    password
                };
        
                const [user, errUser] = await AuthService.login(data);
                if (errUser) throw errUser;
        
                return res.status(200).send({
                    status: 200,
                    iserror: false,
                    message: "login success",
                    data: ResponseFormatter.Auth.login(user.user, user.token)
                });
            } catch (err) {
                next(err)
            }
        }
    }
}