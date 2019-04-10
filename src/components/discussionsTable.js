import React from 'react';
import './discussionsTable.css'

const DiscussionsTable = (props) => {
    return (
        <>


            <tr>
                <td >
                    <h4 class="ui image header">
                        <img src={props.authorImage} class="ui mini rounded image" />
                        <div class="content">
                            {props.authorName}
                        </div>
                    </h4>
                </td>
                <td>{props.debate}</td>
                <td>{props.body}</td>
                <td>{props.timeStamp}</td>
            </tr>



        </>
    )
}
export default DiscussionsTable;


