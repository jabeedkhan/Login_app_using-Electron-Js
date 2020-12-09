import React from 'react';
import { useLocation } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  logout = ()=>{
    this.props.history.push('/sign-in');
  }
  render() {
    // const userInfo = sessionStorage.getItem("userInfo");
    // const { firstname, lastname, emailid, city } = userInfo;
    const firstname = sessionStorage.getItem("firstname");
    return (
          <div style={{textAlign:'center',color:'red'}}>
              <span> Welcome To {firstname}</span>
          </div>

    );
  }
}