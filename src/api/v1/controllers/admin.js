module.exports.AdminController = (AdminService) => {
    return {
        createAdmin: async (req, res, next) => {
            try {
                const {
                    email,
                    password,
                    first_name,
                    last_name,
                } = req.body

                const { admin_secret_key } = req.headers
        
                const data = {
                    email,
                    password,
                    first_name,
                    last_name,
                    secret: admin_secret_key
                }
        
                const [, errUser] = await AdminService.createAdmin(data);
                if (errUser) throw errUser;
        
                return res.status(200).send({
                    status: 200,
                    iserror: false,
                    message: "create admin success",
                });
            } catch (err) {
                next(err)
            }
        }
    }
}