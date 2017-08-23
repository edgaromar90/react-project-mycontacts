import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateContact extends Component {

  state = {
    name: '',
    occupation: '',
    skills: [],
    inputSkills: ''
  }

  validateName = (input) => {
    return true
  }
  validateOccupation = (input) => {
    return true
  }
  validateSkills = (input) => {
    return true
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { name, occupation, skills } = this.state
    if(this.validateName(name) && this.validateOccupation(occupation) && this.validateSkills(skills)){
      console.log('Hello');
    }
    this.props.onAddNewContact({ name, occupation, skills})
  }

  handleInputName = (name) => {
    this.setState({name})
  }

  handleInputOccupation = (occupation) => {
    this.setState({occupation})
  }

  handleInputSkills = (querySkills) => {
    this.setState({inputSkills: querySkills})
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

    return(
      <div>
        <div className="row create-contact-top">
          <span className="input-group-addon" style={ {width:'69px', height:'60px', border:'none'} }>
            <Link to="/">
              <i className="fa fa-arrow-left text-primary" style={ {fontSize:'29px', paddingLeft: '10px'} } aria-hidden="true"></i>
            </Link>
          </span>
        </div>
        <div className="row create-contact-form-wrapper justify-content-center">
          <form className="col-11 col-lg-8 col-xl-5" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input
                type="text"
                value={this.state.name}
                onChange={(e) => this.handleInputName(e.target.value)}
                className="form-control form-control-lg"
                placeholder="Enter Full Name" />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={this.state.occupation}
                onChange={(e) => this.handleInputOccupation(e.target.value)}
                className="form-control form-control-lg"
                placeholder="Enter Occupation" />
            </div>
            <div className="form-group input-group">
              <input
                type="text"
                value={this.state.inputSkills}
                onChange={(e) => this.handleInputSkills(e.target.value)}
                className="form-control form-control-lg"
                placeholder="Add Skills"
                aria-describedby="plusBtn" />
              <span className="input-group-addon" onClick={this.handleAddSkill}>
                <i className="fa fa-plus text-primary" id="plusBtn" aria-hidden="true"></i>
              </span>
            </div>
            <button type="submit" className="btn btn-lg btn-primary">Submit</button>
          </form>
          {/* Separate into a different Component ListSkills */}
          <div className="col-11 col-lg-8 col-xl-5 create-contact-list-skills">
            {
              this.state.skills && (
                <ul className="list-group float-right">
                  {this.state.skills.map((skill) => (
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