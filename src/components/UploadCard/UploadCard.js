import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

// MATERIAL UI - Upload
import Dialog from '@material-ui/core/Dialog';
import UploadBox from '../UploadBox/UploadBox';

// MATERIAL UI - Card
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import red from '@material-ui/core/colors/red';

import Snackbar from '@material-ui/core/Snackbar';

//UPLOAD STAGES
import UploadStage1 from '../UploadStage1/UploadStage1';
import UploadStage2 from '../UploadStage2/UploadStage2';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

const styles = theme => ({
  card: {
    minHeight: 435,
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
});

class UploadCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      imageUrl: '',
      imageData: '', 
      currentUploadStage: 1,
      postTitle: '',
      postContent: '',
      snackOpen: false,
    }, 
    {expanded: false};
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

  handlePostCancel = () => {
    this.setState({ 
      ...this.state,
      open: false,
     });
  };

  handleConfirmImage = () => {
    this.setState({ 
      ...this.state,
      currentUploadStage: 2,
     });
  };

  handleChangeFor = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value,
    })
    console.log(this.state);
  }

  handleSubmitPost = () => {
    this.sendPost();
    this.setState({
      open: false,
      imageUrl: '',
      imageData: '',
      currentUploadStage: 1,
    })
  }

  backToImageUpload = () => {
    this.setState({
      ...this.state,
      currentUploadStage: 1,
    })
  }

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true,
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

  sendPost = () => {
    const data = new FormData();
    data.append('title', this.state.postTitle);
    data.append('content', this.state.postContent);
    data.append('userName', this.props.user.userName);
    data.append('file', this.state.imageData);
    data.append('partner_id', this.props.user.userInfo.partner_id);
    axios.post('api/post', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': this.state.imageData.type,
      }})
      .then(response => {
        console.log('successfully uploaded to the S3: ', response); // do something with the response
        this.props.dispatch({type:'FETCH_POSTS'});
        console.log('BACK FROM SUBMIT: ', window.location.hash.split('/'));
        
        if(window.location.hash.split('/')[1] === 'partner'){
          this.props.dispatch({type: 'GET_PARTNER', payload: window.location.hash.split('/')[2] });
        }
        this.handleSnackOpen();

      })
      .catch(error => {
        console.log('error uploading file: ', error);
      })
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
};


  render() {
    const { classes } = this.props;

    return (
      
      <div className="upload-card">
        <Card id='newPost'>
          <CardHeader style={{height: 81}} title='Upload an image here!'/>
          <UploadBox setImage={this.setImage} />
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        {
          this.state.currentUploadStage === 1 &&
            <UploadStage1 
              imageUrl={this.state.imageUrl} 
              handlePostCancel = {this.handlePostCancel}
              handleConfirmImage = {this.handleConfirmImage}
            />
        }
        {
          this.state.currentUploadStage === 2 &&
            <UploadStage2 
              imageUrl={this.state.imageUrl} 
              backToImageUpload = {this.backToImageUpload}
              handleSubmitPost = {this.handleSubmitPost}
              handleChangeFor = {this.handleChangeFor}
            />
        }
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.snackOpen}
          onClose={this.handleCloseSnack}
          autoHideDuration={2500}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Post Created!</span>}
        />
      </div>
    );
  }
}

UploadCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(UploadCard);
