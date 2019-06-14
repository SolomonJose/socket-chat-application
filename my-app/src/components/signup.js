import React from 'react';

import styles from './Signup.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
  }

//   componentDidMount(){
//     fetch('http://localhost:5000/api/users')
//     .then(res => res.json())
//     .then((users)=> this.setState({users},()=> console.log(users)))

//   }

    render() {
      return (
            <div class="container" style = {styles.container}>
                
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr/>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required/>

    <label for="psw-repeat"><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
    
    <label>
      <input type="checkbox" checked="checked" name="remember" /> Remember me
    </label>
    
    <p>By creating an account you agree to our <a href="#" >Terms & Privacy</a>.</p>

    <div class="clearfix">
        <center>
        <button style={{width:150}} type="submit" class="signupbtn">Sign Up</button>
      <br></br>

     


        </center>
      
    </div>
  </div>

           
       
       





      )
    }
  }

export default Signup ;