import { useState, useEffect } from 'react'
import AnimalList from './components/AnimalList/AnimalList'
import styles from './App.module.scss'

export default function App() {
    const [animals, setAnimals] = useState([]);
    const [newAnimal, setNewAnimal] = useState({
        name: '',
        species: ''
    })

    useEffect(() => {
        fetchAnimals()
    }, [])

    const fetchAnimals = async () => {
        try {
            const response = await fetch('/api/animals')
            const data = await response.json()
            setAnimals(data.animals)
        } catch (error) {
            console.error('Error fetching animals:', error)
        }
    }

    const createAnimal = async (animalData) => {
        try {
            const response = await fetch('/api/animals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animalData)
            });
            const data = await response.json()
            setAnimals(prevAnimals => [...prevAnimals, data.animal])
        } catch (error) {
            console.error('Error creating animal:', error)
        }
    }

    const deleteAnimal = async (id) => {
        try {
            const response = await fetch(`/api/animals/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setAnimals(prevAnimals => prevAnimals.filter(animal => animal._id !== id))
            } else {
                console.error('Failed to delete animal')
            }
        } catch (error) {
            console.error('Error deleting animal:', error)
        }
    }

    const updateAnimal = async (id, updatedAnimalData) => {
        try {
            const response = await fetch(`/api/animals/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAnimalData)
            })
            if (response.ok) {
                const updatedAnimal = await response.json()
                setAnimals(prevAnimals => prevAnimals.map(animal => {
                    if (animal._id === id) {
                        return updatedAnimal;
                    }
                    return animal;
                }))
            } else {
                console.error('Failed to update animal')
            }
        } catch (error) {
            console.error('Error updating animal:', error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createAnimal(newAnimal)
        setNewAnimal({ name: '', species: '' })
    }

    return (
        <div className={styles.App}>
            <h1>Animal Shelter</h1>
            <AnimalList
                animals={animals}
                createAnimal={createAnimal}
                deleteAnimal={deleteAnimal}
                updateAnimal={updateAnimal}
                handleSubmit={handleSubmit}
                newAnimal={newAnimal}
                setNewAnimal={setNewAnimal}
            />
        </div>
    )
}
