import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Step1 extends Component {
    render() {
        return (
            <div>
            <div className="registration-container">
                <Paper>
                    <div className="registration-inputs-container">
                            <h2>Create your account</h2>
                            <br/>
                            <TextField
                            id="name"
                            label="Name"
                            value={this.props.state.partner.name}
                            onChange={this.props.handleChangeFor('name')}
                            margin="normal"
                            />
                            <br/>
                            <TextField
                            id="location"
                            label="Location"
                            value={this.props.state.partner.location}
                            onChange={this.props.handleChangeFor('location')}
                            margin="normal"
                            />
                            <br/>
                            <TextField
                            id="type"
                            label="Type"
                            value={this.props.state.partner.type}
                            onChange={this.props.handleChangeFor('type')}
                            margin="normal"
                            />
                            <br/>
                            <Button variant="contained" color="primary" >
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={this.props.nextStep}>
                                Next
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default Step1;