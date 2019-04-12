import React from 'react';

const SupportingPage = (props) => {
    return (
        <>


            <div class="card" >
                <div class="image">
                    <img src={props.image} style={{ "width": "100%", "height": "100%", "objectFit": "contain" }} />
                </div>
                <div class="content">
                    <div class="header"> {props.name}</div>

                    <div class="description">
                        {props.bio}
                    </div>
                </div>
                <div class="extra content">
                    <span class="right floated">

                        Joined:  {props.joined}
                    </span>
                    <span>
                        <i class="user icon"></i>
                        {props.supporters}
                    </span>

                </div>
            </div>




        </>
    )
}

export default SupportingPage;