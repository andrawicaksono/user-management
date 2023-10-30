const mongoose = require("mongoose");

const { Schema } = mongoose;

const user = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: true
    },
    
    last_name: {
        type: String,
        required: true
    },
    
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "{VALUE} is not supported"
        }
    },

    date_of_birth: {
        type: Date,
    },

    phone: {
        type: String,
    },

    address: {
        type: String
    },

    photo: {
        type: String
    },

    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} is not supported"
        }
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

    deleted_at: {
        type: Date,
    }
});

module.exports.User = mongoose.model("user", user);