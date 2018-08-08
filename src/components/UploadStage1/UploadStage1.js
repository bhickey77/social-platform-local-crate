import React, { Component } from 'react';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const imageStyle = {
  margin: '0 auto',
  width: '100%',
  height: 'auto',
}

const testImage = {
  margin: '0 auto',
  width: '100%',
  height: 'auto',
  /* height: 250px; */
}

const imageContainerStyle = {
  height: 'auto', 
  width: 'auto',
  maxWidth: 350, 
  maxHeight: 300,
  margin: '0 auto',
}

class UploadStage1 extends Component {
  render() {
    return (
      <div >
        <DialogContent>
            <img src={this.props.imageUrl} className="uploadImage" alt=""/>
        </DialogContent>
        <DialogTitle id="form-dialog-title">Are you sure this is the image you would like to upload?</DialogTitle>
        <DialogActions>
          <Button onClick={this.props.handlePostCancel} color="primary">
            No, cancel Post Creation
          </Button>
          <Button onClick={this.props.handleConfirmImage} color="primary">
            Yes, confirm image
          </Button>
        </DialogActions>
      </div>
    );
  }
}
export default UploadStage1;
