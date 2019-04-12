import React, {Component} from 'react';
import DiscussionsPosts from './discussionPost';

class Discussions extends Component {
    state ={
        posts : [
            {
                author: 'abdul',
                image: '',
                text : 'this is such a great read',
                time: 'now',
            },
            {
                author: 'Oufkir',
                image: '',
                text : 'I feel I just wasted my time',
                time: 'now',
            }
        ]
    }



    render() {
        return (
            <>
                
                <table class="ui celled table">
                    <thead>
                        <tr>
                            <th className="four wide"> Users </th>
                            <th className="twelve wide''"> Posts </th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.posts.map((e, i) => {
                            return <DiscussionsPosts
                                key={i}
                                name={e.author}
                                image={e.image}
                                text={e.text}
                                time={e.time}
                            />
                        })}

                    </tbody>
                </table>
            </>
        )
    }
}

export default Discussions;