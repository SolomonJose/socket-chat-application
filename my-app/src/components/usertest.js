import React from 'react';



class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/users')
    .then(res => res.json())
    .then((users)=> this.setState({users},()=> console.log(users)))

  }

    render() {
      return (
        <div>
           <h1>Hello These are the customers</h1>

      <ul>
        {this.state.users.map(user => <li key = {user.name}>{user.name}</li>)}
        </ul>


        </div>
       





      )
    }
  }

export default User ;