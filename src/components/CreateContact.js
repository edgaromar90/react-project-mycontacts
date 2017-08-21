import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateContact extends Component {
    render() {
        return(
            <div>
                <div className="create-contact-top">
                    <span className="input-group-addon">
                        <Link to="/">
                            <i className="fa fa-arrow-left text-primary" aria-hidden="true"></i>
                        </Link>
                    </span>
                </div>
            </div>
        );
    }
}

export default CreateContact;