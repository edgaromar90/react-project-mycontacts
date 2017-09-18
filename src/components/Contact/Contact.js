import React from 'react';

/**
** Stateless Functional Component, receives a single contact
** and attach the onDeleteContact() prop to an icon, passing
** the contact so it can be deleted.
*/
function Contact(props){
  const { contact } = props;

  return(
    <div className="contact">
      <div className="profile-pict float-left">
      {/* Hard coded picture, changing the image for different screen size */}
        <picture>
          <source media="(max-width: 700px)" srcSet="https://placekitten.com/g/60/60"/>
          <source media="(max-width: 1000px)" srcSet="https://placekitten.com/g/90/90"/>
          <img className="img-responsive rounded-circle" src="https://placekitten.com/g/110/110" alt="profile" style={ {width: 'auto'} }/>
        </picture>
      </div>
      <div className="profile-close float-right">
        <i
          className="fa fa-close"
          onClick={() => props.onDeleteContact(contact)}
          aria-hidden="true"
          style={ {fontSize: '1.5em'} }></i>
      </div>
      <div className="profile-info float-left">
        <h4 style={ {marginBottom: '0'} }>{ contact.name }</h4>
        <p>{ contact.occupation }</p>
        <small className="text-success">
        { contact.skills &&
          contact.skills.map((s, i) => <span key={i}> | {s}</span>)
        }
        </small>
      </div>
    </div>
  );
}

export default Contact;