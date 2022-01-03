const mongoose = require('mongoose')
const schema = new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: "Post is Required Field" },
        content: String,
    },
    { timestamps: true }
)
schema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})
const Comment = mongoose.model('Comment', schema)
module.exports = Comment