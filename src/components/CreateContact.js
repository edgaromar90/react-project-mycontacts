import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateContact extends Component {

  validateFullName = (input) => {

  }

  validateOccupation = (input) => {

  }

  handleSubmit = (form) =>{

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
          <form className="col-11 col-lg-8 col-xl-5">
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Enter Full Name" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Enter Occupation" />
            </div>
            <div className="form-group input-group">
              <input type="text" className="form-control form-control-lg" placeholder="Add Skills" aria-describedby="plusBtn" />
              <span className="input-group-addon">
                <i className="fa fa-plus text-primary" id="plusBtn" aria-hidden="true"></i>
              </span>
            </div>
            <button type="submit" className="btn btn-lg btn-primary float-right">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateContact;