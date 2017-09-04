import React from 'react';
import ListContacts from './ListContacts';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

describe('Testing list contacts', () => {

  const contacts = [
    {
      id:1,
      name:'Unit-Test',
      occupation:'tester',
      skills: ['test components']
    },{
      id:2,
      name:'Unit-Test',
      occupation:'tester',
      skills: ['test components']
    },{
      id:3,
      name:'Unit-Test',
      occupation:'tester',
      skills: ['test components']
    },{
      id:4,
      name:'Unit-Test',
      occupation:'tester',
      skills: ['test components']
    }
  ];

  const func = () => console.log('just to pass something')

  it(`renders ${contacts.length} contacts without any errors`, () => {
    const component = mount(
      <MemoryRouter>
        <ListContacts
          contacts={contacts}
          onDeleteContact={func} />
      </MemoryRouter>
    );
    expect(component.find('li').length).toEqual(contacts.length);
  });

  it('updates the state when typing in input field', () => {
    const component = mount(
      <MemoryRouter>
        <ListContacts
          contacts={contacts}
          onDeleteContact={func} />
      </MemoryRouter>
    );
    const myQuery = 'Something';
    component.find('input').simulate('change', {
      target: {
        value: myQuery
      }
    });
    expect(component.find('ListContacts').get(0).state.query).toEqual(myQuery)
  });

  it('does not show clear button when query state is empty', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ListContacts
          contacts={contacts}
          onDeleteContact={func} />
      </MemoryRouter>
    );
    // query state is '' by default
    expect(wrapper.find('button').length).toEqual(0)
  });

  it('shows the clear button when query state is not empty', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ListContacts
          contacts={contacts}
          onDeleteContact={func} />
      </MemoryRouter>
    );
    // User types, handler update the state
    wrapper.find('input').simulate('change', {
      target: {
        value: 'not empty'
      }
    });
    // And button is displayed
    expect(wrapper.find('button').length).toEqual(1)
  });

  it('clears the state when clicked on clear button', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ListContacts
          contacts={contacts}
          onDeleteContact={func} />
      </MemoryRouter>
    );
    wrapper.find('input').simulate('change', {
      target: {
        value: 'not empty'
      }
    });
    wrapper.find('button').simulate('click')
    expect(wrapper.find('ListContacts').get(0).state.query).toEqual('')
  });

});