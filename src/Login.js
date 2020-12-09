import React, { Component, useState } from "react";
import "./Login.css";
import { useSpring, animated } from "react-spring";

function Login() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 0px transparent"
      : "solid 2px #1059FF",  //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #ff1038"
      : "solid 0px transparent", //Animate bottom border of register button
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          Login
        </animated.button>
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          Register
        </animated.button>
      </div>
      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        <a herf="#">Forgot your password</a>
      </animated.div>
    </div>
  );
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.setState({
      username: '',
      password: '',
      userInfo: [],
    })
  }
  getLoginUserInformation = async (username, password) => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();
    if (json && json.length > 0) {
      this.setState({ userInfo: json });
      const { firstname, lastname, emailid, city } = json[0];
      sessionStorage.setItem("firstname", firstname);
      sessionStorage.setItem("lastname", lastname);
      sessionStorage.setItem("emailid", emailid);
      sessionStorage.setItem("city", city);
      console.log('json value',json[0]);
      window.location.reload();
      // this.props.history.push({ pathname: '/home', state: { userInfo: json[0] } });
    } else {
      alert('Invalide Username and Password');
    }
  }
  validateLoginInfo = async (event) => {
        event.preventDefault();
        console.log('validateLoginInfo function called');
         const username = this.state && this.state.username;
         const password = this.state && this.state.password;
        // console.log('user name ', username);
        // console.log('password ', password);
        if( (username && username.length === 0) && (password && password.length === 0)) {
          alert('User Name and Password can not be empty');
          return false;
    }
    const response = await this.getLoginUserInformation(username, password);
    //return false;
    // const value = await getLoginUserInformatiomFromDb(username, password, event);
    // return value || false;
   
  }

  handelUsername = (event) => {
    this.setState({
      username:event.target.value
    })
  }
  handelPwd = (event) => {
    this.setState({
        password:event.target.value
    })
  }
  render() {
    return (
      <React.Fragment>
        <label for="username">USERNAME</label>
        <input type="text" id="username" onChange={this.handelUsername} />
        <label for="password">PASSWORD</label>
        <input type="password" id="password" onChange={this.handelPwd} />
        <input type="submit" value="submit" className="submit" onClick={this.validateLoginInfo} />
      </React.Fragment>
    );
  }

}

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      signupemail: '',
      signuppassword: '',
      city: '',
      disableSubmitButton: false,
    }
  }
  insertNewUserInfomation = async (username, firstname, lastname, password, city) => {
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, firstname, lastname, password, city }),
    });
    const json = await response.json();
    if (json && json.status === 'error' && json.type === 'USER_EXITS') {
      alert('User already exits. Please try with different Id');
      return false;
    }
    if (json && json.status) {
      alert('Registration successful. Please login');
      // this.props.history.push('./');
      // window.location.href = './';
      window.location.reload();
      
    } else {
      alert('Invalide Username and Password');
    }
  }

  validateSignupInformation = async (event) => {
    event.preventDefault();
    const fname = this.state.fname;
    const lname = this.state.lname;
    const signupemail = this.state.signupemail;
    const signuppassword = this.state.signuppassword;
    const city = this.state.city;
    if (fname.length === 0 || lname.length === 0 || signupemail.length === 0 || signuppassword.length === 0 || city.length === 0) {
      alert('Form fields can not be empty');
      return false;
    }
    const response = await this.insertNewUserInfomation(signupemail, fname, lname, signuppassword, city);

    return true
  }
  handelFirstname = (event) => {
    this.setState({
      fname: event.target.value
    })
  }
  handelLastname = (event) => {
    this.setState({
      lname: event.target.value
    })
  }
  handelEmail = (event) => {
    this.setState({
      signupemail: event.target.value
    })
  }
  handelPassword = (event) => {
    this.setState({
      signuppassword: event.target.value
    })
  }
  handelCity = (event) => {
    this.setState({
      city: event.target.value
    })
  }
  checkEmailId = async () => {
    const { signupemail: username } = this.state;
    const response = await fetch('http://localhost:3001/validateEmailId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    const json = await response.json();
    if (json && json.status === 'error' && json.type === 'USER_EXITS') {
      alert('User already exits. Please try with different Id');
      this.setState({ disableSubmitButton: true });
    } else {
      console.log('json ', json);
      this.setState({ disableSubmitButton: false });
    }
  }
  render() {
    return (
      <React.Fragment>
        <label for="first">first name</label>
        <input type="text" id="first" onChange={this.handelFirstname} />
        <label for="last">last name</label>
        <input type="text" id="last" onChange={this.handelLastname} />
        <label for="email">email</label>
        <input type="text" id="email" onChange={this.handelEmail} onBlur={this.checkEmailId} />
        <label for="password">password</label>
        <input type="password" id="password" onChange={this.handelPassword} />
        <label for="city">City</label>
        <input type="text" id="city" onChange={this.handelCity} />
        <input type="submit" value="submit" className="submit" onClick={this.validateSignupInformation} disabled={this.state.disableSubmitButton} />
      </React.Fragment>
    );
  }

}

export default Login;

