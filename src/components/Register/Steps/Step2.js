import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Phone from './Phone';
class RegisterStep2 extends Component {
    render() {
        return (
            <div>
            <div className="registration-container">
                <Paper>
                    <div className="registration-inputs-container">
                            <h2>Create your account</h2>
                            <br/>
                            <TextField
                                id="first_name"
                                label="First Name"
                                value={this.props.state.person.first_name}
                                onChange={this.props.handleChangeFor('first_name')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="last_name"
                                label="Last Name"
                                value={this.props.state.person.last_name}
                                onChange={this.props.handleChangeFor('last_name')}
                                margin="normal"
                            />  
                             <br/>
                            <TextField
                                id="email"
                                label="Email"
                                value={this.props.state.person.email}
                                onChange={this.props.handleChangeFor('email')}
                                margin="normal"
                            /> 
                            <br/>
                            <Phone 
                                handleChangeForPhone={this.props.handleChangeForPhone}
                            />
                            <br/>
                            <Button color="primary" onClick={this.props.previousStep}>
                                Previous Step
                            </Button>
                            <Button color="primary" onClick={this.props.nextStep}>
                                Next Step
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default RegisterStep2;