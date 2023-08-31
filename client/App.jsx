import React, { Component } from 'react';
import WorkoutLogger from './WorkoutLogger.jsx';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './stylesheets/styles.css';


const App = () => {
    const [exercise, setExercise] = useState('');
    const [weight, setWeight] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [sets, setSets] = useState('');
    const [date, setDate] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [randoms, setRandoms] = useState([]);
    useEffect(() => {
        // Fetch workouts from the server and update state
        fetch('/api')
          .then(response => response.json())
          .then(workoutsData => setWorkouts(workoutsData))
          .catch(error => console.error('Error fetching workouts:', error));
      }, []);

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

    const WorkoutCard = (props) => {
      return (
        <div className="box">
            <h3>{props.details.name}</h3>
            <p>Type: {props.details.type}</p>
            <p>Muscle: {props.details.muscle}</p>
            <p>Equipment: {props.details.equipment}</p>
            <p>Difficulty: {props.details.difficulty}</p>
            <p>Instructions: {props.details.instructions}</p>
        </div>
      )
    }
    const getLibrary = async () => {
        console.log('clicked');
        try {
           console.log('in try');
           const response = await fetch('/library');
           const data = await response.json();
           console.log('in getLibrary', data);
           setRandoms(data);
        } catch(err) {
            console.log(err);
        }
        //   .then(response => {
        //     console.log('in response')
        //     response.json()
        //   })
        //   .then(data => {
        //     console.log('library data', data)
        //     return data;
        //   })
        //   .catch(error => console.error('Error getting library', error));
      };
    console.log('random', randoms)
    return (
      
      <div className="everything">
        <div className='logs'>
          <h1>Welcome to Choeson Workouts!</h1>
          <input className="inputs" name="exercise" type="text" value={exercise} placeholder="Exercise" onChange={e => setExercise(e.target.value)} required />
          <input className="inputs" name="weight" type="number" value={weight} placeholder="Weight" onChange={e => setWeight(e.target.value)} required />
          <input className="inputs" name="repetitions" type="number" value={repetitions} placeholder="Reps" onChange={e => setRepetitions(e.target.value)} required />
          <input className="inputs" name="sets" type="number" value={sets} placeholder="Sets" onChange={e => setSets(e.target.value)} required />
          <button onClick={handleAddWorkout}>Add Workout</button>
          <ul>
            {workouts.map(workout => (
              <li key={workout._id}>
                {`Exercise: ${workout.exercise}`} - {`Pounds: ${workout.weight}`} - {`Reps: ${workout.repetitions}`} - {`Sets: ${workout.sets}`} - {`Date: ${workout.date}`}
              </li>
            ))}
          </ul>
        </div>
        <div className='randomWorkouts'>
          <h2>10 Random Choeson Workouts of the Day</h2>
          <Button className="libraryBtn" variant="contained" onClick={getLibrary}>Open Library</Button>  
            <div className="random-container">
                {randoms.map((details, index) => (
                  <WorkoutCard key={index} details={details} />
                ))}
            </div>
        </div>
      
      
      </div>
    );
}


export default App;