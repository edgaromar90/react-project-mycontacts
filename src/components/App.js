import React, { Component } from 'react';
import '../App.css';
import ListContacts from './ListContacts';
import Search from './Search';
import CreateContact from './CreateContact';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <CreateContact />
        <ListContacts />
      </div>
    );
  }
}

export default App;
