import React, { Component } from 'react';
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

import Uppy from '@uppy/core';
import DragDrop from '@uppy/react/lib/DragDrop';


class UploadBox extends Component {
  constructor(props){
    super(props);
    
  }

  uppy = Uppy({
    meta: { type: 'profilePicture' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })
  
  render() {
    this.uppy.on('upload', file => {
      let fileKey = Object.keys(this.uppy.state.files)[0];
      let imageData = this.uppy.state.files[fileKey].data;
      this.props.setImage(imageData);
    })

    return (
      <div>
        <DragDrop
          uppy={this.uppy}
          locale={{
            strings: {
              chooseFile: 'Pick a new avatar'
            }
          }}
          />
          {JSON.stringify(this.uppy.state.files)}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

export default UploadBox;
