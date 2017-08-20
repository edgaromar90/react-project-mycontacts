import React, { Component } from 'react';
import Contact from './Contact'

class ListContacts extends Component {
    render() {
        return(
            <div>
                <ul>
                    <li><Contact /></li>
                    <li><Contact /></li>
                    <li><Contact /></li>
                </ul>
            </div>
        );
    }
}

export default ListContacts;