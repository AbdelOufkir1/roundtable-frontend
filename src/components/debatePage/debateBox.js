import React from 'react';
import './debateBox.css'

const debateBox = (props) => {
    return (
        <>
        {props.side === 'One' ? 
        
        <div className="ui left attached rail">
            <div class="ui segment">
                Left Rail Content
            </div>        
        </div>    
            :
        <div className="ui right attached rail">
            <div class="ui segment">
            Right Rail Content
            </div>        
        </div>    

             }
        
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