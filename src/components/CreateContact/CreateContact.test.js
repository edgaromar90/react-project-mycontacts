import React from 'react';
import CreateContact from './CreateContact';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';



describe('Testing Create Contact', () => {

  const contact = [
    {
      id:1,
      name:'Unit-Test',
      occupation:'tester',
      skills: ['test components']
    }
  ];

  it('returns false if the name is empty', () => {
    const component = shallow(<CreateContact />);
    expect(component.instance().validateName('')).toBe(false);
  });

  it('returns true if the name is passed', () => {
    const component = shallow(<CreateContact />);
    expect(component.instance().validateName('name')).toBe(true);
  });

  it('returns false if the occupation is empty', () => {
    const component = shallow(<CreateContact />);
    expect(component.instance().validateOccupation('')).toBe(false);
  });

  it('returns true if the occupation is passed', () => {
    const component = shallow(<CreateContact />);
    expect(component.instance().validateOccupation('something')).toBe(true);
  });

  it('does not show list element when there are no skills', () => {
    const component = shallow(
      <CreateContact/>
    );
    expect(component.find('li').length).toEqual(0);
  });

  it('does not add empty value to the skill state', () => {
    const component = mount(
      <MemoryRouter>
        <CreateContact />
      </MemoryRouter>
    );

    component.find('.fa-plus').parent().simulate('click');

    expect(component.find('CreateContact').get(0).state.inputSkills).toEqual('');
  });

  it('add skills to the state and display that skill', () => {
    const component = mount(
      <MemoryRouter>
        <CreateContact/>
      </MemoryRouter>
    );

    component.find('[placeholder="Add Skills"]').simulate('change', {
      target: { value: 'my first skill'}
    });
    component.find('.fa-plus').parent().simulate('click');
    expect(component.find('li').length).toEqual(1);
  });

  it('removes a skill from the state and delete that skill from the list', () => {
    const component = mount(
      <MemoryRouter>
        <CreateContact />
      </MemoryRouter>
    );

    //Adding a skill, displaying an <li>my first skill</li>
    component.find('[placeholder="Add Skills"]').simulate('change', {
      target: { value: 'my first skill'}
    });
    component.find('.fa-plus').parent().simulate('click');

    //Deleting the added skill from the state
    component.find('.fa-close').simulate('click');

    expect(component.find('li').length).toEqual(0);
  });

  it('shows a list element when a skill is added to state', () => {
    const component = mount(
      <MemoryRouter>
        <CreateContact />
      </MemoryRouter>
    );

    //Adding a skill, displaying an <li>my first skill</li>
    component.find('[placeholder="Add Skills"]').simulate('change', {
      target: { value: 'my first skill'}
    });

    expect(component.find('li').length).toEqual(0);
  });

  it('updates the occupation state when onchange is fired', () => {
    const component = mount(
      <MemoryRouter>
        <CreateContact />
      </MemoryRouter>
    );
    const myOccupation = 'my Occupation'
    component.find('[placeholder="Enter Occupation"]').simulate('change', {
      target: { value: myOccupation}
    });
    expect(component.find('CreateContact').get(0).state.occupation)
    .toEqual(myOccupation);
  });

  it('updates the name state when onchange is fired', () => {
    const component = mount(
      <MemoryRouter>
        <CreateContact />
      </MemoryRouter>
    );
    const myName = 'my Name'
    component.find('[placeholder="Enter Full Name"]').simulate('change', {
      target: { value: myName}
    });

    expect(component.find('CreateContact').get(0).state.name).toEqual(myName);
  });

  it('updates emptyFields to true when submitted form validation is not successful', () => {
    const wrapper = mount(
      <MemoryRouter>
        <CreateContact />
      </MemoryRouter>
    );
    const component = wrapper.find('CreateContact').get(0);
    component.setState({name: 'my name', occupation: 'something'});
    wrapper.find('form').simulate('submit');

    expect(component.state.emptyFields).toBe(true);
  });

  it('calls onAddNewContact func when submitted form validation is successful', () => {
    let hasBeenCalled = false;
    const wrapper = mount(
      <MemoryRouter>
        <CreateContact onAddNewContact={(x,s,w) => { hasBeenCalled = true }} />
      </MemoryRouter>
    );
    const component = wrapper.find('CreateContact').get(0);
    component.setState({name: 'my name', occupation: 'something', skills: ['first skill']});
    wrapper.find('form').simulate('submit');

    expect(hasBeenCalled).toBe(true);
  });



});


