const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    bio: String,
    address:String,
    phone: String,
    profilPic:String,
    coverPic:String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
)
module.exports = User