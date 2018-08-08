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
    }
  }

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

  componentDidMount = () => {
    if(!this.props.user.userInfo.is_default_image){
      this.setState({
        ...this.state,
        imageUrl: this.props.user.userInfo.media_url,
      })
    }
  }

  backToImageUpload = () => {
    this.setState({
      ...this.state,
    })
  }

  updateImage = () => {
    this.props.dispatch(triggerProfileImageUpload(this.state.imageData, this.props.user.userInfo.partner_id));
    this.setState({
      open: false,
      imageUrl: '',
      imageData: '',
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="upload-card">
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
          imageUrl = {this.state.imageUrl}
        />
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UpdatePartnerPicture);
