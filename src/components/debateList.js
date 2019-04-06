import React from 'react';
import './debateList.css'

const debateList = (props) => {
    return (
        <> 
        <div className="row">
            <div className="Author three wide column">
                        <img src={props.first_debater.image} width="128" height="128"/>
                        <h2>{props.first_debater.name}</h2>
            </div>
            <div className="debatesTable ten wide column debateCat">               
                    <h3>{props.title}</h3>
                    <h4>{props.description}</h4>
                    <h5>{props.title}</h5>
            </div>
            <div className="Author three wide column">   
                        <img src={props.second_debater.image} width="128" height="128" className="ui circular image"/>
                        <h2>{props.second_debater.name}</h2>   
            </div>
        </div>
        </>
    )
}

export default debateList;