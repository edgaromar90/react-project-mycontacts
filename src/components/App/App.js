import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from '../ListContacts/ListContacts';
import CreateContact from '../CreateContact/CreateContact';
import * as ContactsAPI from '../../utils/ContactsAPI';
import '../../App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      contacts: []
    };

    this.deleteContact = this.deleteContact.bind(this);
    this.addNewContact = this.addNewContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
  }

  deleteContact(contact){
    ContactsAPI.deleteContact(contact.id).then(response => {
      return this.setState(prevState =>(
        {
          contacts: prevState.contacts.filter(c => c.id !== contact.id)
        }
      ));
    });
  }

  updateContact(){
    ContactsAPI.getAll().then(contacts =>
      Array.isArray(contacts)
      ? this.setState({contacts})
      : console.warn(contacts.error) );
  }

  addNewContact(contact){
    ContactsAPI.addContact(contact).then(response => {
      contact.id = this.state.contacts.length + 1;
      this.setState(prevState => (
        { contacts: prevState.contacts.concat(contact) }
      ));
    });
  }

  componentDidMount(){
    this.updateContact();
  }

  render() {

    return (
      <div className="App conatiner-fluid">
        <Route exact path="/" render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.deleteContact} />
        )} />
        <Route path="/create/contact" render={ ({history}) => (
          <CreateContact onAddNewContact={(contact) => {
            this.addNewContact(contact)
            history.push('/')
          }}/>
        )}/>
      </div>
    );
  }
}

export default App;
