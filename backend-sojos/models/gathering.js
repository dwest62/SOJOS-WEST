const mongoose = require('mongoose')

const gatheringSchema = new mongoose.Schema({
  postDate: Date,
  date: {
    type: Date
  },
  startTime: String,
  endTime: String,
  content: String,
  rsvp: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: Object
})

gatheringSchema.set('toJSON', {
  transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Gathering = mongoose.model('Gathering', gatheringSchema)

module.exports = Gathering