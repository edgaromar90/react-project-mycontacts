//const url = 'http://localhost:5000'; //Use this for accessing the app on your local machine
const url = 'http://192.168.1.151:5000'; //Use this for accessing the app on your network use your IP

export const getAll = () =>
  fetch(`${url}/get/contact/`)
    .then(res => res.json())
      .then(contacts => contacts)

export const getContact = (id) =>
  fetch(`${url}/get/contact/${id}`)
    .tehn(res => res.json())
      .then(contact => contact)

export const addContact = (contact) => {
  //const data = new FormData()
  //data.append('json', JSON.stringify(contact));
  return fetch(`${url}/create/contact/`,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(contact)
    })
    .then(res => res.json())
      .then(response => response);
}

export const deleteContact = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${url}/delete/contact/${id}`,
      {
        method: 'DELETE',
        headers:{'Content-Type':'text/pain'}
      }
    )
    resolve({status:'success'})
  });
}
