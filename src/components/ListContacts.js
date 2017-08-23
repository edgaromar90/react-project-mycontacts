import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import Contact from './Contact';

class ListContacts extends Component {

  state={
    query: ''
  }

  handleChange = (query) =>{
    this.setState({query});
  }

  render() {

    const { contacts } = this.props;
    const { query } = this.state;
    let showingContacts;

    if(query){
      const match = new RegExp(escapeRegExp(query), 'i');
      showingContacts = contacts.filter(contact => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('name'));

    return(
      <div>
        <div className="search row">
          <div className="col-12 justify-content-center input-group input-group-lg">
            <input
              className="form-control col-10 col-lg-6"
              type="text"
              placeholder="Search Contact"
              value={query}
              onChange={(e) => this.handleChange(e.target.value)}
              aria-describedby="plusBtn" />
            <span className="input-group-addon" id="plusBtn">
              <Link to="/create/contact">
                <i className="fa fa-user-plus text-primary" aria-hidden="true"></i>
              </Link>
            </span>
          </div>
          <div className="col-12 justify-content-md-center">
            <div className="text-center">{query}</div>
          </div>
        </div>

        <div className="list-contacts-wrapper">
          <ul className="list-contacts row justify-content-center">
            { showingContacts.map(contact => (
                <li key={contact.id} className="col-12 col-sm-10 col-lg-8">
                  <Contact
                    contact={contact}
                    onDeleteContact={this.props.onDeleteContact}/>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default ListContacts;