const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    birthDate: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        trim: true,
        lowercase: true,
        default: "customer"
    },
    tickets: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.birthDate;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject__v;
    return userObject;
};

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username});
    if (!user) {
        throw new Error('Wrong username');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Wrong password')
    }
    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
