import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {

  state={
    query: ''
  }

  handleChange = (query) =>{
    this.setState({query});
  }

  render() {
    return(
      <div className="search row">
        <div className="col-12 justify-content-center input-group input-group-lg">
          <input
            className="form-control col-10 col-lg-6"
            type="text"
            placeholder="Search Contact"
            value={this.state.query}
            onChange={(e) => this.handleChange(e.target.value)}
            aria-describedby="plusBtn" />
          <span className="input-group-addon" id="plusBtn">
            <Link to="/create/contact">
              <i className="fa fa-user-plus text-primary" aria-hidden="true"></i>
            </Link>
          </span>
        </div>
        <div className="col-12 justify-content-md-center">
          <div className="text-center">{this.state.query}</div>
        </div>
      </div>
    );
  }
}

export default Search;