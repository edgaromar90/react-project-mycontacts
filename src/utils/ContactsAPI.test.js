import React from 'react';
import * as ContactsAPI from './ContactsAPI';

describe('Testing Contacts API utility ', () => {

  const contact = {
        name: 'Unit Test',
        occupation: 'something',
        skills: ['some','others']
      }

  let validId, validName;

  //Make sure to have an empty database
  test('getAll() returns "No Contacts in the database" when db is empty', () => {
    expect.assertions(1);
    return ContactsAPI.getAll().then(response =>
      expect(response.error).toEqual('No Contacts in the database')
    );
  });

  test('addContact(contact) creates a new contact', () => {
    expect.assertions(1);
    return ContactsAPI.addContact(contact).then(data =>
      expect(data.response).toEqual('success')
      ).catch(e => console.error(e));
  });

  test('getAll() returns an Array of contact object', () => {
    expect.assertions(1);
    return ContactsAPI.getAll()
      .then(data =>{
        expect(Array.isArray(data)).toBe(true)
        validId = data[0].id
        validName = data[0].name
      })
        .catch(e => console.error(e));
  });


  test('getContact(id) returns a single contact object', () => {
    expect.assertions(1);
    return ContactsAPI.getContact(validId)
      .then(response => expect(response.name).toEqual(validName) )
        .catch(e => console.error(e));
  });

  test('getContact(id) returns "Contact does not Exist" when id is invalid', () => {
    expect.assertions(1);
    return ContactsAPI.getContact(1000).catch(response =>
      expect(response.error).toEqual('Contact does not Exist')
    );
  });

  test('deleteContact(id) deltes a contact from the database', () => {
    expect.assertions(1);
    //Make sure there's an id with that number already in the database
    return ContactsAPI.deleteContact(validId)
      .then(data => expect(data.response).toEqual('success') )
        .catch(e => console.error(e));
  });



});