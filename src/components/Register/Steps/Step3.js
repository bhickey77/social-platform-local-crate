import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegisterStep3 extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
            <div className="registration-container">
                <Paper>
                    <div className="registration-inputs-container">
                            <h2>Create your account</h2>
                            <br/>
                            <TextField
                                id="username"
                                label="Username"
                                value={this.props.state.person.username}
                                onChange={this.props.handleChangeFor('username')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                value={this.props.state.person.password1}
                                onChange={this.props.handleChangeFor('password1')}
                                margin="normal"
                            />
                            <br/>
                            <TextField
                                id="password"
                                label="Confirm Password"
                                type="password"
                                value={this.props.state.person.password2}
                                onChange={this.props.handleChangeFor('password2')}
                                margin="normal"
                            />
                            <br/>
                            <Button color="primary" onClick={this.props.previousStep}>
                                Previous Step
                            </Button>
                            <Button color="primary" onClick={this.props.handleSubmit}>
                                Create Account
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default RegisterStep3;