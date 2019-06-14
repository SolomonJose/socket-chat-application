
  import React from 'react';

  
  class Chatpage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {connections: []};
    }
  
    // componentDidMount(){
    //   fetch('http://localhost:5000/api/connections')
    //   .then(res => res.json())
    //   .then((users)=> this.setState({users},()=> console.log(users)))
  
    // }
  
      render() {
        return (
        
             
        <div>
            <div className="username">
            <h2>User name</h2>
            </div>
            <div className="chat_section" style={{border :1}}>
            <ul>
            {/* {this.state.connections.map(user => <li key = {user.name}>{user.name}</li>)} */}
            <li>Chats</li>
            <li>Chats</li>
            <li>Chats</li>
            </ul>
            <br/><br/><br/> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
           
            
            
           
            <input style = {{ left :12,width : 700}} type="text" placeholder="Type a Message" name="message" />
          



            </div>

            

            


        </div>
          

          
            
          
  
  
  
  
  
        )
      }
    }
  
  export default Chatpage ;