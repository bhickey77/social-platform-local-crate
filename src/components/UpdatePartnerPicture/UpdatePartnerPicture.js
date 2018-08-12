import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

// MATERIAL UI - Upload
import Dialog from '@material-ui/core/Dialog';
import UploadBox from '../UploadBox/UploadBox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

//UPLOAD STAGES
import UploadStage1 from './UploadStage1/UploadStage1';

import { triggerProfileImageUpload } from '../../redux/actions/partnerActions';

import Snackbar from '@material-ui/core/Snackbar';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});


class UpdatePartnerPicture extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      imageUrl: false,
      imageData: null, 
      snackOpen: false,
    }
  }

  handleCloseSnack = () => {
    this.setState({ 
      ...this.state,
      snackOpen: false,
     });
  };

  handleSnackOpen = () => {
    this.setState({ 
      ...this.state,
      snackOpen: true,
     });
  };

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      open: false,
    })
  }

  setImage = (imageData) => {
    console.log(`SETTING IMAGE: `, imageData);
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.setState({
        ...this.state,
        imageUrl: reader.result,
      })
    }
    reader.readAsDataURL(imageData);
    this.setState({
      ...this.state,
      open: true,
      imageData: imageData,
    })
  }

  backToImageUpload = () => {
    this.setState({
      ...this.state,
    })
  }

  updateImage = () => {
    this.props.dispatch(triggerProfileImageUpload(this.state.imageData, this.props.user.userInfo.partner_id));
    this.props.updateProfilePictureOnDOM(this.state.imageUrl);
    this.handleSnackOpen();
    this.setState({
      open: false,
      imageUrl: '',
      imageData: '',
    })
  }

  render() {
    const { classes } = this.props;
    let imageUrl = false;
    if(!this.props.user.userInfo.is_default_image){
      imageUrl = this.props.user.userInfo.partner_media_url
    } 
    if(this.state.imageUrl){
      imageUrl = this.state.imageUrl;
    }
    return (
      <div>
        <IconButton onClick={this.handleClickOpen} aria-label="Edit">
          <EditIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <UploadStage1 
          imageUrl={this.state.imageUrl} 
          handleClose = {this.handleClose}
          updateImage = {this.updateImage}
          setImage = {this.setImage}
          imageUrl = {imageUrl}
        />
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.snackOpen}
          onClose={this.handleCloseSnack}
          autoHideDuration={2500}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Profile Photo Updated!</span>}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(UpdatePartnerPicture);
