import React from 'react';
import './debateHeader.css';

const debateHeader = (props) => {
    return (
        <>
            <div className="ui block header ">
                <div className="ui grid">
                    <div className="four wide column debateHeader">
                        <div className="card">
                            <div className="image">
                                <img src={props.infos.debaters.first_debater.image} />
                            </div>
                            <div className="content">
                                <div className="header"> {props.infos.debaters.first_debater.name} </div>
                            </div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <button className="ui button"> Supporters <br /> {props.infos.debaters.first_debater.num_supporters}</button>
                                    <div className="or" data-text="">  </div>
                                    <button className="ui positive button"> Debaters<br />{props.infos.debaters.first_debater.num_debaters}</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="eight wide column debateHeader">
                        <div className="ui segments">
                            <h2 className="ui segment"> <h1> {props.infos.title} </h1></h2>
                            <div className="ui segment"> <h3>{props.infos.description} </h3></div>
                            <div className="ui segment"> <h4>{props.infos.rules}</h4> </div>
                        </div>

                        <div className="ui labeled button" tabIndex="0">
                            <div className="ui red button" onClick={props.addFollow}>
                                <i className="heart icon"></i> Follow
                            </div>
                            <a className="ui basic red left pointing label">
                                {props.infos.numfollowers}

                            </a>
                        </div>
                    </div>

                    <div className="four wide column debateHeader">
                        <div className="card">
                        <div className="image">
                                <img src={props.infos.debaters.second_debater.image} />
                            </div>
                            <div className="content">
                                <div className="header"> {props.infos.debaters.second_debater.name} </div>
                            </div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <button className="ui button"> Supporters <br /> {props.infos.debaters.second_debater.num_supporters}</button>
                                    <div className="or" data-text="">  </div>
                                    <button className="ui positive button"> Debaters<br />{props.infos.debaters.second_debater.num_debaters}</button>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>

        </>
            )
        
        }
        
        export default debateHeader;
        
        
          
