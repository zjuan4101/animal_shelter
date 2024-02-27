import { useState } from 'react'
import Animal from '../Animal/Animal'
import styles from './AnimalList.module.scss'

export default function AnimalList({ animals, deleteAnimal, updateAnimal, handleSubmit, newAnimal, setNewAnimal }) {
    return (
        <div className={styles.animalList}>
            <div className={styles.addAnimal}>
                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Animal Name"
                        value={newAnimal.name}
                        onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Animal Species"
                        value={newAnimal.species}
                        onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Image Link"
                        value={newAnimal.image}
                        onChange={(e) => setNewAnimal({ ...newAnimal, image: e.target.value })}
                    />
                    <label>
                        Reserved for Adoption:
                        <input
                            type="checkbox"
                            checked={newAnimal.reservedForAdoption}
                            onChange={(e) => setNewAnimal({ ...newAnimal, reservedForAdoption: e.target.checked })}
                        />
                    </label>
                    <button type="submit">Add Animal</button>
                </form>
            </div>
            <h3>Animals</h3>
            {animals.map(animal => (
                <Animal
                    key={animal._id}
                    animal={animal}
                    deleteAnimal={deleteAnimal}
                    updateAnimal={updateAnimal}
                />
            ))}
        </div>
    )
}
