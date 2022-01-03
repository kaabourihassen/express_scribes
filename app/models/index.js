const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose

db.role = require('./role.model.js')
db.user = require('./user.model.js')
db.post = require('./post.model.js')
db.comment = require('./comment.model')
db.ROLES = ["user", "admin"]

module.exports = db
