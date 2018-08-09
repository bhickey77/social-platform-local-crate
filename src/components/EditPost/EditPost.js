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

  edit = () => {
      this.date = new Date();
      this.setState({
        ...this.state,
        post: {
          ...this.state.post,
          date_updated: this.dateConvert(this.date),
        } 
      });
      this.props.dispatch({ 
        type: POST_ACTIONS.EDIT_POST,
        payload: this.state.post, 
        image: this.state.imageHasBeenUpdated ? this.state.post.newImage: false,
      });
      this.handleClose();
  }

  dateConvert = ( date ) => {
    return moment().utc( date ).format("MMM Do YYYY");
  }

  setImage = imageData => {
    console.log(`SETTING IMAGE: `, imageData);
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

    let editStatus = null;


    if( this.props.user.userInfo === null || this.props.user.userInfo.partner_id !== this.props.post.partner_id ) {
      editStatus = null;
    }
    else {
      editStatus = 
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
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                      R
                  </Avatar>
                  }
                  title={this.state.post.partner_name}
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
      </div>
    }

    return (
      <div>
        {editStatus}
      </div>
    );
  }
}

export default compose(withStyles(styles),connect())(EditPost);