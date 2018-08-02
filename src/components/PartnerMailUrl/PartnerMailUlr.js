import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerRegistration } from '../../redux/actions/loginActions';
import RegisterStep1 from './RegisterComponents/RegisterStep1';
import RegisterStep2 from './RegisterComponents/RegisterStep2';
import RegisterStep3 from './RegisterComponents/RegisterStep3';
import Dialog from '@material-ui/core/Dialog';
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
        password1: '',
        password2: ''
      },
      step: 1
    }
  }

  handleSubmit = () => {
    if ( this.state.person.password1 === this.state.person.password2 ) {
      this.props.dispatch(triggerRegistration(this.state.partner, this.state.person));
      this.props.history.push('/');
    } else {
      this.setState({person: {
        username: '',
        password1: '',
        password2: ''
      }})
      return <Dialog>Uh oh! Looks like your passwords don't match! Please try again</Dialog>
    }
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

  nextStep = () => {
    this.setState({
      step : this.state.step + 1
    })
  }
  
  // Same as nextStep, but decrementing
  previousStep = () => {
    this.setState({
      step : this.state.step - 1
    })
  }
    
  render() {
      
    switch (this.state.step) {
      case 1:
        return <RegisterStep1 state={this.state}
          handleChangeFor={this.handleChangeFor}
          nextStep={this.nextStep} />
      case 2:
        return <RegisterStep2 state={this.state}
          handleChangeFor={this.handleChangeFor}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
      case 3:
        return <RegisterStep3 state={this.state}
          handleChangeFor={this.handleChangeFor}
          handleSubmit={this.handleSubmit}
          previousStep={this.previousStep}
        />
      // case 4:
      //   return <Confirmation state={this.state}
      //     nextStep={this.nextStep}
      //     previousStep={this.previousStep}
      //   />
      // case 5:
      //   return <Success />
    };
  
    // return (
    //   <div>
    //     <div className="registration-container">
    //       <Paper>
    //         <div className="registration-inputs-container">
    //           <h2>Create your account</h2>
    //           <TextField
    //             id="name"
    //             label="Name"
    //             value={this.state.partner.name}
    //             onChange={this.handleChangeFor('name')}
    //             margin="normal"
    //           />
    //           <br/>
    //           <TextField
    //             id="location"
    //             label="Location"
    //             value={this.state.partner.location}
    //             onChange={this.handleChangeFor('location')}
    //             margin="normal"
    //           />
    //           <br/>
    //           <TextField
    //             id="type"
    //             label="Type"
    //             value={this.state.partner.type}
    //             onChange={this.handleChangeFor('type')}
    //             margin="normal"
    //           />
    //           <br/>
    //           <TextField
    //             id="username"
    //             label="Username"
    //             value={this.state.person.username}
    //             onChange={this.handleChangeFor('username')}
    //             margin="normal"
    //           />
    //           <br/>
    //           <TextField
    //             id="first_name"
    //             label="First Name"
    //             value={this.state.person.first_name}
    //             onChange={this.handleChangeFor('first_name')}
    //             margin="normal"
    //           />
    //           <br/>
    //           <TextField
    //             id="last_name"
    //             label="Last Name"
    //             value={this.state.person.last_name}
    //             onChange={this.handleChangeFor('last_name')}
    //             margin="normal"
    //           />
    //           <br/>
    //           <TextField
    //             id="password"
    //             label="Password"
    //             type="password"
    //             value={this.state.person.password}
    //             onChange={this.handleChangeFor('password')}
    //             margin="normal"
    //           />
    //           <br/>
    //           <Button variant="contained" color="primary" onClick={this.handleSubmit}>
    //             Create Account
    //           </Button>
    //         </div>
    //       </Paper>
    //     </div>
    //   </div>
    // );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PartnerMailUrl);
