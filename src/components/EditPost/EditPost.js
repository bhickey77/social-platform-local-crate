import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '../../../node_modules/@material-ui/core';
import { POST_ACTIONS } from '../../redux/actions/postActions';
import EditImageBox from '../EditImageBox/EditImageBox';
import DeletePost from '../DeletePost/DeletePost';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';


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

class EditPost extends Component {
  state = {
    open: false,
    post: this.props.post,
    partner: this.props.partner,
    imageHasBeenUpdated: false,
    areChanges: false,
    snackOpen: false,
  };

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

  handleChange = ( property ) => event => {
    this.setState({
        ...this.state,
        areChanges: true,
        post: {
          ...this.state.post,
          [property]: event.target.value,
        }
    })
  }

  dateConvert = ( date ) => {
    return moment().utc( date ).format("MMM Do YYYY");
  }

  handleDialogAndSnack = () => {
    this.setState({
      open: false,
      snackOpen: true,
    })
  }

  edit = () => {
      this.date = new Date();
      this.setState({
        ...this.state,
        post: {
          ...this.state.post,
          date_updated: this.dateConvert(this.date),
        } 
      });
      const postToSetOnDOM = {
        ...this.state.post,
        media_url: this.state.imageHasBeenUpdated ? this.state.imageUrl : this.state.post.media_url,
      }
      this.props.editPostOnDOM(postToSetOnDOM);
      this.props.dispatch({ 
        type: POST_ACTIONS.EDIT_POST,
        payload: this.state.post, 
        image: this.state.imageHasBeenUpdated ? this.state.post.newImage: false,
      });
      this.handleDialogAndSnack();
  }

  dateConvert = ( date ) => {
    return moment().utc( date ).format("MMM Do YYYY");
  }

  setImage = imageData => {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.setState({
        ...this.state,
        areChanges: true,
        imageHasBeenUpdated: true,
        imageUrl: reader.result,
        post: {
          ...this.state.post,
          newImage: imageData,
        }
      })
    }
    reader.readAsDataURL(imageData);
  }

  render() {
    const { classes } = this.props;

    let editable = false;
    editable = this.props.user && this.props.user.userInfo && this.props.user.userInfo.partner_id === this.props.post.partner_id;
    const avatar_url = (this.props.post.is_default_image) ? "images/FreshnessAssuredBy.png" : this.props.post.partner_media_url;


    return (
      <div>
        {editable &&
          <div>
            <IconButton onClick={this.handleClickOpen} aria-label="Edit">
              <EditIcon />
            </IconButton>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
                <Card className='postDialog'>
                  <CardHeader
                      avatar={
                        <Link to={`/partner/${this.props.post.partner_id}`}>
                          <Avatar
                            aria-label="Recipe" 
                            src={avatar_url}
                          />   
                        </Link>
                      }
                      title={this.props.post.partner_name}
                      subheader={String(this.dateConvert(this.props.post.date_created))}
                  >
                  </CardHeader>
                  <CardContent>
                    <img className="edit-image" src={(!this.state.imageHasBeenUpdated) ? this.state.post.media_url : this.state.imageUrl} alt=""/>
                    <br />
                    <br />
                    <span className="edit-media-container">
                      <EditImageBox setImage={this.setImage} />
                    </span>
                      <span className="edit-text-fields">
                        <Typography>
                            <TextField
                              className={classes.editText}
                              value={this.state.post.title}
                              label="Title"
                              onChange={this.handleChange('title')}/>
                              <br />
                              <br />
                              <br />
                            <TextField
                              className={classes.editText}
                              value={this.state.post.content}
                              label="Text Content"
                              onChange={this.handleChange('content')}
                              rows={3}
                              multiline={true}
                              />
                        </Typography>
                      </span>
                      <Button onClick={this.handleClose} >
                        Cancel Edit
                      </Button>
                      <Button onClick={this.edit} >
                        Save Edit
                      </Button>
                      <DeletePost id={this.state.post.post_id}/>
                      {(this.state.areChanges) &&
                        <Typography className={classes.saveWarning}>
                          Don't forget to save your changes
                        </Typography>
                      }
                  </CardContent>
                </Card>
            </Dialog>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={this.state.snackOpen}
              onClose={this.handleCloseSnack}
              autoHideDuration={2500}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Post Updated!</span>}
            />
          </div>
          }
      </div>
    );
  }
}

export default compose(withStyles(styles),connect())(EditPost);