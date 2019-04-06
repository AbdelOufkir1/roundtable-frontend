import React from 'react';
import './discussionsTable.css'

const DiscussionsTable = (props) => {
    return (
        <>
      
                <tbody>
                    <tr>
                        <td >{props.author}</td>
                        <td>{props.debate}</td>
                        <td>{props.body}</td>
                        <td>{props.timeStamp}</td>
                    </tr>
                </tbody>
                
            
        </>
    )
}

export default DiscussionsTable;

