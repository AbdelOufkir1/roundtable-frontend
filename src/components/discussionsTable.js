import React from 'react';
import './discussionsTable.css'

const DiscussionsTable = (props) => {
    return (
        <>
      
                <tbody>
                    <tr>
                        <td >{props.authorName}</td>
                        <td >{props.authorImage}</td>
                        <td>{props.debate}</td>
                        <td>{props.body}</td>
                        <td>{props.timeStamp}</td>
                    </tr>
                </tbody>
                
            
        </>
    )
}

export default DiscussionsTable;

