import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class PostFilterSelect extends Component {


    render() {
        const { classes } = this.props;

        return (
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="post-filter">Filter</InputLabel>
                    <Select
                    value={this.props.filter}
                    onChange={this.props.handleChange}
                    inputProps={{
                    id: 'post-filter',
                    }}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value='partner_name'>Partner Name</MenuItem>
                        <MenuItem value='title'>Title</MenuItem>
                        <MenuItem value='content'>Content</MenuItem>
                        <MenuItem value='date_created'>Date Created</MenuItem>
                        <MenuItem value='date_updated'>Date Updated</MenuItem>
                        <MenuItem value='is_marked_as_hidden'>Hidden Status</MenuItem>
                    </Select>
                </FormControl>
        )
    }
}

PostFilterSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PostFilterSelect);