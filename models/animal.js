const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
  name: String,
  species: String,
  image: String,
  reservedForAdoption: Boolean
})

const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal