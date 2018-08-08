import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { POST_ACTIONS } from '../../redux/actions/postActions';

const styles = theme => ({
    card: {
    //   maxWidth: 1000,
    },
    card1: {
    //   maxwidth: 400,
    },
    dialog: {
      width: 1000,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    editText: {
      width: '100%',
    },
    saveWarning: {
      color: 'red',
    }
  });

class DeletePost extends Component {
  state = {
    open: false,
    post: this.props.post,
  };

  handleClickOpen = () => {
    this.setState({
        open: true,
        post: this.props.post
    });
    console.log(this.state.post);
  };

  handleClose = () => {
    this.setState({ open: false });
    if( this.props.open ) {
      this.props.handleClose();
    };
  };

  delete = (id) => {
      this.props.dispatch({ 
        type: POST_ACTIONS.DELETE_POST,
        payload: id 
      });
      this.handleClose();
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.handleClickOpen} aria-label="Edit">
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Typography>
                Are you sure you want to delete this post?
                </Typography>
            </DialogContent>
            <DialogContent>
                <Button onClick={this.handleClose} >
                    Cancel Delete
                </Button>
                <Button onClick={() => this.delete(this.props.id)} >
                    Confirm Delete
                </Button>
            </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default compose(withStyles(styles),connect())(DeletePost);