import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class AdminMailer extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    axios({
        method: "POST", 
        url:"http://localhost:3002/send", 
        data: {
            name: name,   
            email: email,  
            messsage: message
        }
    }).then((response)=>{
        if (response.data.msg === 'success'){
            alert("Message Sent."); 
            this.resetForm()
        }else if(response.data.msg === 'fail'){
            alert("Message failed to send.")
        }
    })
  }

  resetForm(){
    document.getElementById('contact-form').reset();
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
            {/* <form id="contact-form" method="POST"> */}
            <div className="form-group">
            <label for="name">Name</label>
            <input type="text" className="form-control" id="name" />
        </div>
        <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
            <label for="message">Message</label>
            <textarea className="form-control" rows="5" id="message"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
         
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminMailer);
