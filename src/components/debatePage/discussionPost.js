import React from 'react';

const discussionPost = (props) =>{
    return (
        <>
        <tr>
        <td>
            <h4 class="ui image header">
            <img src={props.image} class="ui mini rounded image"/>
            <div class="content">
                {props.name}
                <div class="sub header"> {props.time}
            </div>
            </div>
        </h4></td>
        <td>
            {props.text}
        </td>
        </tr>
        </>
    )


}

export default discussionPost;