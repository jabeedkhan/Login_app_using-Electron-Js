import React, { Component } from 'react';
import './Logout.css';
import { useLocation } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const firstname = sessionStorage.getItem("firstname");
    const logout = () => {
      sessionStorage.clear();
      window.location.href = './';

    }
    return (
      <div className='logout'>
        <div className="log-in">
          <h3>Please Logout</h3>
        </div><hr></hr>
        <br></br>
        <div className="logout1">
          {/* <button onClick={logout}>Logout</button> */}
          <a  href="javascript:void(0)" onClick={logout}>
             Logout
         </a>
        </div>
      </div>
    );
  }

}

export default Logout;
