import React from 'react';
import './debateHeader.css';

const debateHeader = (props) => {
    return (
        <>
            <div className="ui block header ">
            <div className="ui grid">
                <div className="four wide column debateHeader">
                
                    <img src={props.infos.debaters.first_debater.image} />
                    <div class="ui buttons">
                        <button class="ui button"> Supporters <br/> {props.infos.debaters.first_debater.num_supporters}</button>
                        <div class="or" data-text=""></div>
                        <button class="ui positive button"> Debaters<br/>{props.infos.debaters.first_debater.num_debaters}</button>
                    </div>
                
                </div>
                <div className="eight wide column debateHeader">
                    <div className="ui segments">
                        <h2 className="ui segment"> {props.infos.title}</h2>
                        <div className="ui segment"> {props.infos.description} </div>
                        <div className="ui segment"> {props.infos.rules} </div>

                     </div>   

                </div>
                <div className="debateHeader four wide column ">
                    <img src={props.infos.debaters.second_debater.image} />
                    <div class="ui buttons">
                        <button class="ui button"> Supporters <br/> {props.infos.debaters.second_debater.num_supporters}</button>
                        <div class="or" data-text=""></div>
                        <button class="ui positive button"> Debaters <br/>{props.infos.debaters.second_debater.num_debaters}</button>
                    </div>
                </div>
                </div>
                   
                
            </div>

        </>
    )

}

export default debateHeader;


// <div className="image">
// <img src={props.infos.debaters.first_debater.image} />
// </div>
// <div className="content">
// <a className="header">{props.infos.subject}</a>
// <div className="meta">
//     <span> {props.infos.description} </span>
// </div>
// <div className="description">
//     <p> {props.infos.rules} </p>
// </div>
// <div className="extra">
//     Additional Details
// </div>
// <div className="image">
//     <img src={props.infos.debaters.second_debater.image} />
// </div>
// </div>