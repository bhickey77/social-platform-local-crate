import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis: 200,
    },
});

const ranges = [
    {
      value: 'Farmer',
      label: 'Farmer',
    },
    {
      value: 'Maker',
      label: 'Maker',
    },
    {
      value: 'Supplier',
      label: 'Supplier',
    },
    {
      value: 'Other',
      label: 'Other',
      },
  ];  

class Step1 extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
            <div className="registration-container">
                <Paper>
                    <div className="registration-inputs-container">
                            <h2>Create your account</h2>
                            <br/>
                            <TextField
                            id="name"
                            label="Business Name"
                            value={this.props.state.partner.name}
                            onChange={this.props.handleChangeFor('name')}
                            margin="normal"
                            />
                            <br/>
                            <TextField
                                id="website"
                                label="Business Website"
                                value={this.props.state.partner.website}
                                onChange={this.props.handleChangeFor('website')}
                                margin="normal"
                            /> 
                            <br/>
                            <TextField
                            id="city"
                            label="City"
                            value={this.props.state.partner.city}
                            onChange={this.props.handleChangeFor('city')}
                            margin="normal"
                            />
                            <br/>
                            <TextField
                            id="state"
                            label="State"
                            value={this.props.state.partner.state}
                            onChange={this.props.handleChangeFor('state')}
                            margin="normal"
                            />
                            <br/>
                            <TextField
                                select
                                label=""
                                className={classNames(classes.margin, classes.textField)}
                                value={this.props.state.partner.type}
                                onChange={this.props.handleChangeFor('type')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Partner</InputAdornment>,
                                }}
                                >
                                {ranges.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <br/>
                            <Button color="primary" onClick={this.props.nextStep}>
                                Next
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}

Step1.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Step1);