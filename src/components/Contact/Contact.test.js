import React from 'react';
import { shallow, mount } from 'enzyme';
import Contact from './Contact'


let contact = {
  id:200,
  name:'Unit-Test 1',
  occupation:'tester',
  skills: ['test components']
};

let idToDelete;

const func = (contact) => {
  idToDelete = contact.id;
};

const component = mount(
  <Contact
      contact={contact}
      onDeleteContact={func}
    />
);

test('component render without any errors', () => {
  expect(component).toEqual(expect.anything());
});
test('delete a contact', () => {
  const button = component.find('.fa-close');
  button.simulate('click');
  expect(idToDelete).toEqual(contact.id);
});

test('render 1 skill correctly', () => {
  expect(component.find('small.text-success')
    .text()).toEqual(' | test components');
});

test('render 2 skills correctly', () => {
  contact.skills.push('one more skill')
  const newComponent = mount(
    <Contact
      contact={contact}
      onDeleteContact={func}
      />
  );
  expect(newComponent.find('small.text-success')
    .text()).toEqual(' | test components | one more skill');
});