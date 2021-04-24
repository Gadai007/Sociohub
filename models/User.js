const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    pic:{
        type: String,
        default: 'https://res.cloudinary.com/gadai007/image/upload/v1618826664/l60Hf_ufvkee.png',
    },
    password: {
        type: String,
        required: true,

    },
    resetToken: String,
    expiresIn: Date,
    followers: [{
        type: ObjectId,
        ref: 'user'
    }],
    following: [{
        type: ObjectId,
        ref: 'user'
    }]

}, { timestamps: true})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.authenticate = async function (email, password) {
    const user = await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }else{
            return false
        }
    }else{
        return false
    }
}

const User = mongoose.model('user', userSchema)

module.exports = { User }