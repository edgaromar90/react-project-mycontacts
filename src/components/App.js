import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import '../App.css';

class App extends Component {

  state = {
    contacts: [
      {
        id: 1,
        name: 'Edgar Henriquez',
        occupation: 'Web Developer',
        skills: ['JavaScript', 'Python/Flask', 'React.js']
      },
      {
        id: 2,
        name: 'Josue Martinez',
        occupation: 'Full-Stack Developer',
        skills: ['Angular.js', 'C#/.Net', 'React.js']
      },
      {
        id: 3,
        name: 'Edwin Almonte',
        occupation: 'DB Admin',
        skills: ['Oracle', 'JavaScript', 'React.js']
      },
      {
        id: 4,
        name: 'John Doe',
        occupation: 'Front-End Developer',
        skills: ['Sass', 'Backbone.js', 'React.js']
      }
    ]
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
        <Route exact path="/create/contact" render={() => (
          <CreateContact onAddNewContact={this.addNewContact}/>
        )} />
      </div>
    );
  }
}

export default App;
