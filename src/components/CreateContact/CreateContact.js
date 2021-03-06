import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateContact extends Component {

  /* Initial state of this component */
  state = {
    name: '',
    occupation: '',
    skills: [],
    inputSkills: '',
    emptyFields: false
  }

/* Very basic validation, just avoiding empty fields. */
  validateName = (name) => {
    return name ? true : false
  }
  validateOccupation = (occupation) => {
    return occupation ? true : false
  }
  validateSkills = (skills) => {
    return skills.length ? true : false
  }

  clearEmptyFieldsError = () => {
    this.setState({emptyFields:false})
  }

  /*Handlers for each Input Field*/
  handleInputName = (name) => {
    this.setState({name})
    this.clearEmptyFieldsError()
  }
  handleInputOccupation = (occupation) => {
    this.setState({occupation})
    this.clearEmptyFieldsError()
  }
  handleInputSkills = (querySkills) => {
    this.setState({inputSkills: querySkills})
    this.clearEmptyFieldsError()
  }

  /* Handling Submit and basic validation to avoid empty fields */
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, occupation, skills } = this.state
    if(this.validateName(name) && this.validateOccupation(occupation) && this.validateSkills(skills)){
      this.props.onAddNewContact({ name, occupation, skills})
    }else{
      this.setState({emptyFields: true})
    }
  }

  handleAddSkill = () => {
    const skill = this.state.inputSkills;
    if(skill && (this.state.skills.indexOf(skill) === -1)){
      this.setState(prevState => (
        {
          skills: prevState.skills.concat([skill])
        }
      ));
      this.setState({inputSkills: ''})
    }
  }

  removeSkill = (skill) => {
    this.setState(prevState => (
      {
        skills: prevState.skills.filter(s => s !== skill)
      }
    ));
  }

  render() {

    const { emptyFields, name, occupation, skills, inputSkills } = this.state;

    return(
      <div>
        <div className="create-contact-top">
          <span className="input-group-addon" style={ {width:'69px', height:'60px', border:'none'} }>
            <Link to="/">
              <i className="fa fa-arrow-left text-primary" style={ {fontSize:'29px', paddingLeft: '10px'} } aria-hidden="true"></i>
            </Link>
          </span>
        </div>
        <div className="row create-contact-form-wrapper justify-content-center">
          <form className="col-11 col-lg-8 col-xl-5" onSubmit={this.handleSubmit}>
            <div className="form-group">
              {emptyFields && (<p className="alert alert-danger">All fields are required.</p>)}
              <input
                type="text"
                value={name}
                onChange={(e) => this.handleInputName(e.target.value)}
                className="form-control form-control-lg"
                placeholder="Enter Full Name" />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={occupation}
                onChange={(e) => this.handleInputOccupation(e.target.value)}
                className="form-control form-control-lg"
                placeholder="Enter Occupation" />
            </div>
            <div className="form-group input-group">
              <input
                type="text"
                value={inputSkills}
                onChange={(e) => this.handleInputSkills(e.target.value)}
                className="form-control form-control-lg"
                placeholder="Add Skills"
                aria-describedby="plusBtn" />
              <span className="input-group-addon" onClick={this.handleAddSkill}>
                <i className="fa fa-plus text-primary" id="plusBtn" aria-hidden="true"></i>
              </span>
            </div>
            <button type="submit" className="btn btn-lg btn-primary">Save</button>
          </form>
          <div className="col-11 col-lg-8 col-xl-5 create-contact-list-skills">
            {
              skills && (
                <ul className="list-group float-right">
                  {skills.map((skill) => (
                    <li
                      className="list-group-item text-success text-right"
                      style={ {border: 'none'} }
                      key={skill}>
                      {skill.toUpperCase()}
                      <i
                        className="fa fa-close text-left text-dark"
                        onClick={() => this.removeSkill(skill)}
                        aria-hidden="true"
                        style={ {marginLeft:'10px'} }></i>
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CreateContact;