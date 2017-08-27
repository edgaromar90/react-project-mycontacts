import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import '../App.css';

class App extends Component {

  state = {
    contacts: []
  }

  deleteContact = (contact) => {
    this.setState(prevState =>(
      {
        contacts: prevState.contacts.filter(c => c.id !== contact.id)
      }
    ));
  }

  addNewContact = (contact) => {
    contact.id = this.state.contacts.length + 2;
    this.setState(prevState => (
      {
        contacts: prevState.contacts.concat([contact])
      }
    ));
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
