import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


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

class PostFilterConditional extends Component {

    render() {
        const { classes } = this.props;

        let postFilter = null;
        let clearButton = null;

        if (this.props.filter === 'partner.name') {
            postFilter = 
                <FormControl className={classes.formControl}>
                    <TextField
                        id="partner"
                        label="Partner Name"
                        value={this.props.filteredBy}
                        onChange={this.props.handleChange}
                        margin="normal"
                    />
                </FormControl>
        }
        else if (this.props.filter === 'post.is_marked_as_hidden') {
            postFilter = 
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="post-filter">Filter</InputLabel>
                    <Select
                    value={this.props.filteredBy}
                    onChange={this.props.handleChange}
                    inputProps={{
                    id: 'post-filter',
                    }}
                    >
                        <MenuItem value='TRUE'>Hidden</MenuItem>
                        <MenuItem value='FALSE'>Unhidden</MenuItem>
                    </Select>
                </FormControl>
        }

        if(this.props.filteredBy === 'none' || this.props.filteredBy === '') {
            clearButton = null;
        } else {
            clearButton = 
                <Button onClick={this.props.clearFilter}>
                    Clear Filter
                </Button>
        }

        return (
            <span>                    
                {postFilter}

                {clearButton}
                <Button onClick={this.props.handleSubmit}>
                    Filter
                </Button>
            </span>        )
    }
}

PostFilterConditional.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PostFilterConditional);