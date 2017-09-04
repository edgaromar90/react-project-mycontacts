// Uncomment the following line for testing
import fetch from 'isomorphic-fetch';

//const url = 'http://127.0.0.1:5000'; //Use this for accessing the app on your local machine
//const url = 'http://192.168.1.151:5000'; //Use this for accessing the app on your network use your IP
const url = 'http://edgaromar90.pythonanywhere.com'; //Use this for accessing the app on your network use your IP

export const getAll = () =>
  fetch(`${url}/get/contact/`)
    .then(res => res.json() )
      .then(contacts => contacts)

export const getContact = (id) => {
  return new Promise( (resolve, reject) =>
    fetch(`${url}/get/contact/${id}`)
    .then(res => res.json() )
      .then(contact => contact.error ? reject(contact) : resolve(contact))
  );
}

export const addContact = (contact) =>
  fetch(`${url}/create/contact/`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(contact)
  }).then(res => res.json())
      .then(response => response);

export const deleteContact = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${url}/delete/contact/${id}`,
      {
        method: 'DELETE',
        headers:{'Content-Type':'text/pain'}
      }
    )
    resolve({response:'success'})
  });
}
