import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerRegistration } from '../../redux/actions/loginActions';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
});

class PartnerMailUrl extends Component {
  constructor(props){
    super(props);
    this.state = {
      partner: {
        name: '',
        location: '',
      },
      person: {
        username: '',
        first_name: '',
        last_name: '',
        password: '',
      }

    }
  }

  handleSubmit = () => {
    this.props.dispatch(triggerRegistration(this.state.partner, this.state.person));
  }

  handleChangeFor = property => event => {
    if(property === 'name' || property === 'location' || property === 'type'){
      this.setState({
        ...this.state,
        partner: {
          ...this.state.partner,
          [property]: event.target.value,
        }
      })
    } else {
      this.setState({
        ...this.state,
        person: {
          ...this.state.person,
          [property]: event.target.value,
        }
      })
    }
  }


  render() {
    return (
      <div>
        <div className="registration-container">
          <Paper>
            <div className="registration-inputs-container">
              <h2>Create your account</h2>
              <TextField
                id="name"
                label="Name"
                value={this.state.partner.name}
                onChange={this.handleChangeFor('name')}
                margin="normal"
              />
              <br/>
              <TextField
                id="location"
                label="Location"
                value={this.state.partner.location}
                onChange={this.handleChangeFor('location')}
                margin="normal"
              />
              <br/>
              <TextField
                id="type"
                label="Type"
                value={this.state.partner.type}
                onChange={this.handleChangeFor('type')}
                margin="normal"
              />
              <br/>
              <TextField
                id="username"
                label="Username"
                value={this.state.person.username}
                onChange={this.handleChangeFor('username')}
                margin="normal"
              />
              <br/>
              <TextField
                id="first_name"
                label="First Name"
                value={this.state.person.first_name}
                onChange={this.handleChangeFor('first_name')}
                margin="normal"
              />
              <br/>
              <TextField
                id="last_name"
                label="Last Name"
                value={this.state.person.last_name}
                onChange={this.handleChangeFor('last_name')}
                margin="normal"
              />
              <br/>
              <TextField
                id="password"
                label="Password"
                value={this.state.person.password}
                onChange={this.handleChangeFor('password')}
                margin="normal"
              />
              <br/>
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                Create Account
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PartnerMailUrl);
