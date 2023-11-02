module.exports.Auth = {
    login: (user, token) => {
        let payload = {
            email: user.email,
            name: user.first_name + " " + user.last_name,
            role: user.role,
            token: token
        }

        return payload;
    }
}