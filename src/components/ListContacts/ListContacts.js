import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import Contact from '../Contact/Contact';

class ListContacts extends Component {

  state = {
    query: ''
  }

  handleChange = (query) =>{
    this.setState({query})
  }

  clearQuery = () => {
    this.setState({query:''})
  }
  /* Create the search bar */
  getSearchComponent = (query, showingContacts, contacts) => {
    return (
      <div>
        <div className="search">
          <div className="col-12 justify-content-center input-group input-group-lg">
            <input
              className="form-control col-10 col-lg-6"
              type="text"
              placeholder="Search Contact"
              value={query}
              onChange={(event) => this.handleChange(event.target.value)}
              aria-describedby="plusBtn" />
            <span className="input-group-addon" id="plusBtn">
              <Link to="/create/contact">
                <i className="fa fa-user-plus text-primary" aria-hidden="true"></i>
              </Link>
            </span>
          </div>
          <div className="col-12 justify-content-md-center">
            {(query) && (
              <div>
                <div className="text-center">
                  Now showing <strong>{showingContacts.length}</strong> of <strong>{contacts.length}</strong> total.
                  <br/>
                  <button href='#' className="btn btn-link" onClick={() => this.clearQuery()}>Show all</button>
                </div>
              </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }

  render() {

    const { contacts } = this.props;
    const { query } = this.state;
    let showingContacts;

    /* If there's a value in the search bar, meaning query has a value,
    ** we filter the contacts passed as props and assigned them to
    ** showingContacts. Else we assign the whole contacts array to
    ** showingContacts.
    */
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i');
      showingContacts = contacts.filter(contact => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    showingContacts !== [] && showingContacts.sort(sortBy('name'));

    return(
      <div>
        {this.getSearchComponent(query, showingContacts, contacts)}
        <div className="list-contacts-wrapper">
          <ul className="list-contacts row justify-content-center">
            { showingContacts.map(contact => (
                <li key={contact.id} className="col-12 col-sm-10 col-lg-8">
                  <Contact
                    contact={contact}
                    onDeleteContact={this.props.onDeleteContact}/>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ListContacts;