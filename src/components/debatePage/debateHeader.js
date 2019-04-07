import React from 'react';
import './debateHeader.css';

const debateHeader = (props) => {
    return (
        <>
            <div className="ui block header ">
            <div className="ui grid">
                <div className="four wide column debateHeader">
                
                    <img src={props.infos.debaters.first_debater.image} />
                    <div className="ui buttons">
                        <button className="ui button"> Supporters <br/> {props.infos.debaters.first_debater.num_supporters}</button>
                        <div className="or" data-text=""></div>
                        <button className="ui positive button"> Debaters<br/>{props.infos.debaters.first_debater.num_debaters}</button>
                    </div>
                
                </div>
                <div className="eight wide column debateHeader">
                    <div className="ui segments">
                        <h2 className="ui segment"> {props.infos.title}</h2>
                        <div className="ui segment"> {props.infos.description} </div>
                        <div className="ui segment"> {props.infos.rules} </div>
                     </div>   

                        <div className="ui labeled button" tabindex="0">
                            <div className="ui red button">
                                <i className="heart icon"></i> Follow
                            </div>
                            <a className="ui basic red left pointing label">
                                1,048
                            
                            </a>
                        </div>


                </div>
                <div className="debateHeader four wide column ">
                    <img src={props.infos.debaters.second_debater.image} />
                    <div className="ui buttons">
                        <button className="ui button"> Supporters <br/> {props.infos.debaters.second_debater.num_supporters}</button>
                        <div className="or" data-text=""></div>
                        <button className="ui positive button"> Debaters <br/>{props.infos.debaters.second_debater.num_debaters}</button>
                    </div>
                </div>
                </div>
                   
                
            </div>

        </>
    )

}

export default debateHeader;
