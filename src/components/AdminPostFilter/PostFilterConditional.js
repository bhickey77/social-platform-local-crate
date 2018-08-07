import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

class PostFilterConditional extends Component {

    render() {
        const { classes } = this.props;

        let postFilter = null;

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

        return (
            <div>
                {postFilter}
            </div>
        )
    }
}

PostFilterConditional.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PostFilterConditional);