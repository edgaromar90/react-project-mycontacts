import React, { Component } from 'react';
import Contact from './Contact'

class ListContacts extends Component {
  render() {

    const { contacts } = this.props;

    return(
      <div className="list-contacts-wrapper">
        <ul className="list-contacts row justify-content-center">
          { contacts.map(contact => (
              <li key={contact.id} className="col-12 col-sm-10 col-lg-8">
                <Contact
                  contact={contact}
                  onDeleteContact={this.props.onDeleteContact}/>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default ListContacts;