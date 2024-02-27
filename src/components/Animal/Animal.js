import { useState } from 'react'
import styles from './Animal.module.scss'

export default function Animal({ animal, deleteAnimal, updateAnimal }) {
    const [editMode, setEditMode] = useState(false)
    const [editedAnimal, setEditedAnimal] = useState({
        name: animal.name,
        species: animal.species,
        image: animal.image,
        reservedForAdoption: animal.reservedForAdoption
    })

    const handleUpdate = async () => {
        await updateAnimal(animal._id, editedAnimal)
        setEditMode(false)
    };

    return (
        <div className={styles.animal}>
            {editMode ? (
                <div className={styles.editMode}>
                    <input
                        type="text"
                        value={editedAnimal.name}
                        onChange={(e) => setEditedAnimal({ ...editedAnimal, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editedAnimal.species}
                        onChange={(e) => setEditedAnimal({ ...editedAnimal, species: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editedAnimal.image}
                        onChange={(e) => setEditedAnimal({ ...editedAnimal, image: e.target.value })}
                    />
                    <label>
                        Reserved for Adoption:
                        <input
                            type="checkbox"
                            checked={editedAnimal.reservedForAdoption}
                            onChange={(e) => setEditedAnimal({ ...editedAnimal, reservedForAdoption: e.target.checked })}
                        />
                    </label>
                    <button onClick={handleUpdate}>Save</button>
                </div>
            ) : (
                <>
                    <h4>{animal.name}</h4>
                    <p>Species: {animal.species}</p>
                    <img src={animal.image} alt="Animal" />
                    <p>Reserved for Adoption: {animal.reservedForAdoption ? 'Yes' : 'No'}</p>
                    <div className={styles.actions}>
                        <button onClick={() => setEditMode(true)}>Edit</button>
                        <button onClick={() => deleteAnimal(animal._id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    )
}
