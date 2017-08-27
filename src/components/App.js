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
      console.log(response)
      this.setState(prevState =>(
        {
          contacts: prevState.contacts.filter(c => c.id !== contact.id)
        }
      ))}
    );
  }

  updateContact = () =>{
    ContactsAPI.getAll().then(contacts =>
      this.setState({contacts})
    );
  }

  addNewContact = (contact) => {
    ContactsAPI.addContact(contact).then(response =>
      this.updateContact()
    );
  }

  componentDidMount(){
    this.updateContact()
  }

  render() {

    return (
      <div className="App conatiner-fluid">
        <Route exact path="/" render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.deleteContact} />
        )} />
        <Route exact path="/create/contact" render={( {history} ) => (
          <CreateContact
            onAddNewContact={(contact) => {
              this.addNewContact(contact)
              history.push('/')
            }
          }/>
        )} />
      </div>
    );
  }
}

export default App;
