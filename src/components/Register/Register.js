import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerRegistration } from '../../redux/actions/loginActions';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Dialog from '@material-ui/core/Dialog';

import Nav from '../Nav/Nav';

const mapStateToProps = state => ({
  user: state.user,
});

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      partner: {
        name: '',
        city: '',
        state: '',
        website: '',
        type: ''
      },
      person: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password1: '',
        password2: ''
      },
      step: 1,
    }
  }

  handleSubmit = () => {
    if ( this.state.person.password1 === this.state.person.password2 ) {
      this.setState({
        person: {
          password: this.state.person.password1
        }
      })
      this.props.dispatch(triggerRegistration(this.state.partner, this.state.person));
      this.props.dispatch({ type: 'JUST_REGISTERED'});
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

  handleChangeForPhone = input => {
    this.setState({
      ...this.state,
      person: {
        ...this.state.person,
        phone: input,
      }
    })
  }

  handleChangeFor = property => event => {
    if(property === 'name' || property === 'city' || property === 'state' || property === 'website' || property === 'type'){
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
  
  previousStep = () => {
    this.setState({
      step : this.state.step - 1
    })
  }
    
  render() {
    return (
      <div>
        <Nav />
        {(this.state.step === 1) && 
          <Step1 state={this.state}
            handleChangeFor={this.handleChangeFor}
            nextStep={this.nextStep} />
        }
        {(this.state.step === 2) && 
          <Step2 state={this.state}
            handleChangeFor={this.handleChangeFor}
            handleChangeForPhone={this.handleChangeForPhone}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
          />
        }
        {(this.state.step === 3) && 
          <Step3 state={this.state}
            handleChangeFor={this.handleChangeFor}
            handleSubmit={this.handleSubmit}
            previousStep={this.previousStep}
            />
        }
      </div>
    )
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Register);
