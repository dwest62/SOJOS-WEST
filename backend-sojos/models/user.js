const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3
  },
  firstName: String,
  lastName: String,
  passwordHash: String,
  gatherings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Gathering'
    }
  ],
  rsvp: Array,
  core: Number,
  kid: Boolean,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User