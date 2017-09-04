import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('Testing App component', () => {

  let contact = {
    name:'Unit-Test 1',
    occupation:'tester',
    skills: ['test components']
  },
  validId,
  contactsLength;

  it('renders without crashing', () => {
    const component = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(component.find('.App').length).toEqual(1);
  });

  it('calls componentDidMount() when <App> renders', () => {
      sinon.spy(App.prototype, 'componentDidMount');
      const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);

      expect(App.prototype.componentDidMount.calledOnce).toEqual(true);
  });

  test('calls updateContact() when <App> renders', () => {
    sinon.spy(App.prototype, 'updateContact');
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);

    expect(App.prototype.updateContact.calledOnce).toBe(true);
  });

  it('calls deleteContact() in route prop onDeleteContact()', () => {
    sinon.spy(App.prototype, 'deleteContact');
    const route = mount(<MemoryRouter><App /></MemoryRouter>);

    route.find('Route').get(0).props.render().props.onDeleteContact(1);
    expect(App.prototype.deleteContact.calledOnce).toBe(true);
  });

/*  it('calls addNewContact() in route prop onAddNewContact()', () => {
    sinon.spy(App.prototype, 'addNewContact');
    const route = mount(<MemoryRouter><App /></MemoryRouter>);
    //Selecting 1 (the next Route)
    console.warn(route.find('Route').get(1));
    const history = route.find('Route').get(1).context.router.history;
    console.warn(history);
    console.warn(route.find('Route').get(1)
      .props.render().props.onAddNewContact(history));
    expect(App.prototype.addNewContact.calledOnce).toBe(true);
    //expect(true).toBe(true);
  });
/*  test('addNewContact(contact) calls addNewContact()', () => {
    sinon.spy(App.prototype, 'addNewContact');
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
    console.warn(App.prototype)
    wrapper.find('CreateContact').get(0).AddNewContact(contact)
    expect(App.prototype.addNewContact.calledOnce).toEqual(true);
  });

  //Get all
/*  test('updateContact() add contacts to the state', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect.assertions(1)
    const component = wrapper.find('App').get(0);
    await component.updateContact(contact);
    wrapper.update();
    //setTimeout(1000);
    //console.warn(component.state.contacts)
    expect(wrapper.state().contacts.length > 0).toBe(true);
  });
/*
  test('deleteContact() deletes 1 contact from the state', () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const component = wrapper.find('App').get(0);
    return component.deleteContact(validId);
    expect(component.state.contacts.length < contactsLength).toBe(true);
  });
*/
});