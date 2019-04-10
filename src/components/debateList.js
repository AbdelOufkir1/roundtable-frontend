import React from 'react';
import './debateList.css'
import CategoryColors from './catergoryColors';

const debateList = (props) => {
    
    return (
        
        <div className="debateBanner ui horizontal segments" style={{"background-color":CategoryColors[props.category]}}>
            <div className="ui center aligned segment">
                <h2 className="debatersBox">
                    <img src="https://www.shareicon.net/data/128x128/2017/07/13/888372_man_512x512.png" class="ui circular image"/>
                    {props.first_debater.name}
                </h2>
            </div>
            <div className="ui center aligned segment " style={{"width":"350px"}}>
                <div className="debateInfoBox">
                <p className="debateTitle">
                    {props.title}
                </p>
                <p className="debateDescription">
                    {props.description}
                </p>
                
                </div>
            </div>
            <div className="ui center aligned segment">
                <h2 className="debatersBox">
                    <img src="https://www.shareicon.net/data/128x128/2017/07/13/888372_man_512x512.png" class="ui circular image"/>
                    {props.second_debater.name}
                </h2>
            </div>   
         </div>

    )
}


export default debateList;