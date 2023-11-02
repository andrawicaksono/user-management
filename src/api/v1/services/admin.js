const bcrypt = require("bcrypt");

const { ERROR } = require("../helpers");
const secret = process.env.ADMIN_SECRET

module.exports.AdminService = (UserRepository) => {
    return {
        createAdmin: async (data) => {
            try {
                if (data.secret !== secret) {
                    return [null, ERROR.ACCESS_DENIED];
                }
                
                const [checkUser, errCheckUser] = await UserRepository.findUserByEmail(data.email);
                if (errCheckUser) return [null, errCheckUser];
        
                if (checkUser) {
                    return [null, ERROR.EMAIL_REGISTERED];
                }
        
                const salt = await bcrypt.genSalt(10);
        
                let userData = {
                    email: data.email,
                    password: await bcrypt.hash(data.password, salt),
                    first_name: data.first_name,
                    last_name: data.last_name,
                    role: 'admin'
                }
        
                const [user, errUser] = await UserRepository.create(userData);
                if (errUser) return [null, errUser];
        
                return [user, null];
            } catch (err) {
                return [null, err];
            }
        }
    }
}