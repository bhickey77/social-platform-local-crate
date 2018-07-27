import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import LogoutPage from '../LogoutPage/LogoutPage';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadFile from '../UploadFile/UploadFile';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class CreatePost extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      profilePictureUrl: '', 
    };
  }

  handleClickOpen = () => {
    this.setState({ 
      ...this.state,
      open: true,
     });
  };

  handleClose = () => {
    this.setState({ 
      ...this.state,
      open: false,
     });
  };

  handleUploadFile = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');
    // '/files' is your node.js route that triggers our middleware
    axios.post('/api/image/profilepicture', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': event.target.files[0].type,
      }})
      .then(response => {
        console.log('successfully uploaded to the S3: ', response); // do something with the response
        this.setState({
          ...this.state,
          profilePictureUrl: response.data,
        })
      })
      .catch(error => {
        console.log('error uploading file: ', error);
      })
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Create Post</Button>
        <input type="file" name="image" onChange={this.handleUploadFile} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default connect(mapStateToProps)(CreatePost);
