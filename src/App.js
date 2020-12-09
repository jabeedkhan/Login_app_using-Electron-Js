import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Navbar from './NavBar/Navbar';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
function App() {
   console.log('render method call', sessionStorage.getItem("firstname"));
    if(sessionStorage.getItem("firstname")== null){
        return <Login/>
    }else{
      return (
        <>
              <Router>
                <Navbar/>
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/profile' component={Profile} />
                  <Route path='/logout' component={Logout}/>
                  
                </Switch>
              </Router>
            </>
          );
    }
  
}

export default App;
/**
 
 */