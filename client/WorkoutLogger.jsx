import React from 'react';
import { useState, useEffect } from 'react';

const WorkoutLogger = () => {
    const [exercise, setExercise] = useState('');
    const [weight, setWeight] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [sets, setSets] = useState('');
    const [date, setDate] = useState('');
    const [workouts, setWorkouts] = useState([]);

    
    const handleClick = async () => {
        const response = await fetch('/logworkout')
        const data = await response.json();
        console.log('in handle click func', data);
        
    }

    const handleAddWorkout = () => {
        // Send the new workout data to the server
        const newWorkout = { exercise, weight, repetitions, sets };
        fetch('/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWorkout)
        })
          .then(response => response.json())
          .then(newWorkoutData => {
            setWorkouts(prevWorkouts => [...prevWorkouts, newWorkoutData]);
            setExercise('');
            setWeight('');
            setRepetitions('');
            setSets('');
            setDate('');
          })
          .catch(error => console.error('Error adding workout:', error));
      };

    return (
        <div>
           <h1>Welcome to Choeson Workouts!</h1>
           <div>
                {/* <input name="exercise" type="text" placeholder="Exercise"></input>
                <input name="weight" type="number" placeholder="Weight"></input>
                <input name="repetitions" type="number" placeholder="Repetitions"></input>
                <input name="sets" type="number" placeholder="Sets"></input>
                <button onClick={handleClick}>Log Workout</button> */}
                <input name="exercise" type="text" value={exercise} placeholder="Exercise" onChange={e => setExercise(e.target.value)} required />
                <input name="weight" type="number" value={weight} placeholder="Weight" onChange={e => setWeight(e.target.value)} required />
                <input name="repetitions" type="number" value={repetitions} placeholder="Reps" onChange={e => setRepetitions(e.target.value)} required />
                <input name="sets" type="number" value={sets} placeholder="Sets" onChange={e => setSets(e.target.value)} required />
                <button onClick={handleAddWorkout}>Add Workout</button>
                <ul>
                  {workouts.map(workout => (
                    <li key={workout._id}>
                    {`Exercise: ${workout.exercise}`} - {`Pounds: ${workout.weight}`} - {`Reps: ${workout.repetitions}`} - {`Sets: ${workout.sets}`} - {`Date: ${workout.date}`}
                    </li>
                  ))}
                </ul>
            </div>
        </div>
        
    )
}

export default WorkoutLogger;