const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports.AuthService = (UserRepository) => {
    return {
        register: async (data) => {
            try {
                const [checkUser, errCheckUser] = await UserRepository.findUserByEmail(data.email);
                if (errCheckUser) return [null, errCheckUser];
        
                if (checkUser) {
                    return [null, Error("error;400;email has already registered!")];
                }
        
                const salt = await bcrypt.genSalt(10);
        
                let userData = {
                    email: data.email,
                    password: await bcrypt.hash(data.password, salt),
                    first_name: data.first_name,
                    last_name: data.last_name,
                }
        
                const [user, errUser] = await UserRepository.create(userData);
                if (errUser) return [null, errUser];
        
                return [user, null];
            } catch (err) {
                return [null, err];
            }
        },
        
        login: async (data) => {
            try {
                const [user, errUser] = await UserRepository.findUserByEmail(data.email);
                if (errUser) return [null, errUser];
                if (!user) return [null, Error("error;404;user not found!")];
        
                const isPassed = await bcrypt.compare(data.password, user.password);
                if (!isPassed)
                    return [null, Error("error;400;wrong password!")];
        
                let payload = {
                    id: user._id,
                }
        
                const token = jwt.sign(payload, jwtSecret, { expiresIn: '30m'});
                
                return [{ user, token }, null];
            } catch (error) {
                return [null, error];
            }
        }
    }
}