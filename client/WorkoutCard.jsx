import React from 'react';


const WorkoutCard = (props) => {
    return (
        <div className="box">
            <h3>{props.name}</h3>
            <p>{props.type}</p>
            <p>{props.muscle}</p>
            <p>{props.equipment}</p>
            <p>{props.difficulty}</p>
            <p id="instructions">{props.instructions}</p>
        </div>
    )
}

export default WorkoutCard;