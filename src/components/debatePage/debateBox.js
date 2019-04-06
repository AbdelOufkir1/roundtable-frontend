import React from 'react';
import './debateBox.css'

const debateBox = (props) => {
    return (
        <>
        <div className="item posts">
                <div className="content">
                    {props.text}        
                <div className="date"> 
                    {props.time}    
                </div>
            </div>
        </div>

        </>
    )
}

export default debateBox;