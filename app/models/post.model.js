const mongoose = require('mongoose')
const schema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    published: Boolean,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
  },
  { timestamps: true }
)
schema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})
const Post = mongoose.model('Post', schema)
module.exports = Post
