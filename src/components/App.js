import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from '../utils/ContactsAPI';
import '../App.css';

class App extends Component {

  state = {
    contacts: []
  }

  deleteContact = (contact) => {
    ContactsAPI.deleteContact(contact.id).then(response => {
      this.setState(prevState =>(
        {
          contacts: prevState.contacts.filter(c => c.id !== contact.id)
        }
      ))}
    );
  }

  updateContact = () => {
    ContactsAPI.getAll().then(contacts => {
      Array.isArray(contacts) && this.setState({contacts})
    })
      .catch(err => console.log(err) );
  }

  addNewContact = (contact) => {
    ContactsAPI.addContact(contact).then(response => {
      contact.id = this.state.contacts.length + 1;
      this.setState(prevState => (
        {
          contacts: prevState.contacts.concat(contact)
        }
      ));
    });
  }

  componentDidMount(){
    this.updateContact()
  }

  render() {

    const { contacts } = this.state
    return (
      <div className="App conatiner-fluid">
        <Route exact path="/" render={() => (
          <ListContacts
            contacts={contacts}
            onDeleteContact={this.deleteContact} />
        )}/>
        <Route exact path="/create/contact" render={( {history} ) => (
          <CreateContact
            contacts={contacts}
            onAddNewContact={(contact) => {
              this.addNewContact(contact)
              history.push('/')
            }
          }/>
        )}/>
      </div>
    );
  }
}

export default App;
