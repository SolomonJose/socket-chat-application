
import React from 'react';

import styles from './Login.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './signup';
import { Link } from 'react-router-dom';




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  //   componentDidMount(){
  //     fetch('http://localhost:5000/api/users')
  //     .then(res => res.json())
  //     .then((users)=> this.setState({users},()=> console.log(users)))

  //   }

  render() {
    return (


      <div style={styles.container}>
        <div class="imgcontainer" >

          {/* <img src="img_avatar2.png" alt="Avatar" class="avatar"/> */}
        </div>

        <div class="container">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />
          <center>
            <button style={{ width: 150 }} type="submit">Login</button>

            {/* <button type="button" class="cancelbtn">Cancel</button> */}


          </center>

        </div>

        <br />
        <center>
          <Link to="/signup">

            <label >Signup First</label>


          </Link>
        </center>



      </div>






    )
  }
}

export default Login;