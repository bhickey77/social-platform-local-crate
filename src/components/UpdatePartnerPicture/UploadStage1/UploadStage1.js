import React, { Component } from 'react';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import UploadBox from '../../UploadBox/UploadBox';

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
    console.log(`PROPS IN UPLOAD STAGE 1: `, this.props);
    
    return (
      <div >
        <DialogTitle id="form-dialog-title">Update your partner profile image</DialogTitle>
        <DialogContent>
          <img src={this.props.imageUrl || "images/FreshnessAssuredBy.png"} className="upload-image-profile-picture" alt=""/>
          <UploadBox setImage={this.props.setImage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel update
          </Button>
          <Button onClick={this.props.updateImage} color="primary">
            Save new image
          </Button>
        </DialogActions>
      </div>
    );
  }
}
export default UploadStage1;
