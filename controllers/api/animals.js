const Animal = require('../../models/animal')

// Create 
exports.createAnimal = async (req, res) => {
  try {
    const newAnimal = await Animal.create(req.body)
    res.status(201).json({ animal: newAnimal })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Index
exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find()
    res.status(200).json({ animals })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete
exports.deleteAnimal = async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Animal deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update
exports.updateAnimal = async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ animal: updatedAnimal })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get animal by ID controller
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' })
    }
    res.status(200).json({ animal })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
