module.exports.UserRepository = (User) => {
    return {
        create: async (data) => {
            try {
                const newUser = await User.create(data);

                return [newUser, null];
            } catch (err) {
                return [null, err]
            }
        },

        findUserByEmail: async (email) => {
            try {
                const user = await User.findOne({
                    email: email
                });

                return [user, null];
            } catch (err) {
                return [null, err];
            }
        },

        findUserById: async (id) => {
            try {
                const user = await User.findOne({
                    _id: id
                })

                return [user, null];
            } catch (err) {
                return [null, err];
            }
        },
        
        findAllUsers: async () => {
            try {
                const users = await User.find({});

                return [users, null];
            } catch (err) {
                return [null, err];
            }
        },

        findUsersByFilter: async (data) => {
            let match = [];

            if (data.gender) {
                match.push({
                    "gender": data.gender
                });
            }

            let aggregation = [
                {
                    $match: {
                        $and: match
                    }
                },
                {
                    $count: "total_rows"
                }
            ];

            try {
                const count = await User.aggregate(aggregation);
                
                aggregation.pop();

                if (data.offset) {
                    aggregation.push({
                        $skip: parseInt(data.offset)
                    });
                }
            
                if (data.limit) {
                    aggregation.push({
                        $limit: parseInt(data.limit)
                    })
                }
                
                let total_rows = count.length > 0? count[0].total_rows : 0;
                const users = await User.aggregate(aggregation);

                return [{ total_rows, users }, null];
            } catch (err) {
                return [null, err];
            }
        },

        update: async (user) => {
            try {
                user.updated_at = new Date();
                const updatedUser = await user.save({
                    new: true
                });

                return [updatedUser, null];
            } catch (err) {
                return [null, err];
            }
        },

        delete: async (user) => {
            try {
                user.deleted_at = new Date();

                const deletedUser = await user.save({
                    new: true
                });

                return [deletedUser, null];
            } catch (err) {
                return [null, err];
            }
        }
    }
}