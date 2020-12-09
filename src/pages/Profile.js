import React, { Component } from 'react'
import './Profile.css';
class Profile extends Component{
  render(){
    const firstname = sessionStorage.getItem("firstname");
    const lastname = sessionStorage.getItem("lastname");
    const emailid = sessionStorage.getItem("emailid");
    const city = sessionStorage.getItem("city");
      return <div className="profile">
        <div className="header">
          <h2>Profile Information</h2>
        </div><hr></hr>
      {/* <div className="image">
        <img src="pic.jpg"/>
      </div> */}
      <hr></hr>
      <div className="body">
       <h4>First Name :{firstname}</h4>
       <h4>Last Name :{lastname}</h4>
       <h4>Email :{emailid}</h4>
       <h4>City :{city}</h4>
      </div>
  </div>
  }
    
}

  
  


export default Profile;



/*
<div className="profile">
      <div className="image">
        <img src="pic.jpg"/>
      </div>
      <hr></hr>
      <div className="body">

      </div>
  </div>
*/