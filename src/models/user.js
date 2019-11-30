const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid.")
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 6)
            {
                throw new Error("Password needs to be 6 characters long!")
            }
            else if(value.toLowerCase().includes("password")){
                throw new Error("Password can not contain 'password'!")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error("Age must be a positive number.")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email})

    if(!user){
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("Unable to login")
    }

    return user
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, "TaskBoys")

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

//Hash the plain text pw before saving
userSchema.pre("save",async function (next) {
    const user = this

    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User 