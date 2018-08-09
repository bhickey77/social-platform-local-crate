import React, { Component } from 'react';
import EditPost from '../EditPost/EditPost';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

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
  });

class PostDialog extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const avatar_url = (this.props.post.is_default_image) ? "images/FreshnessAssuredBy.png" : this.props.post.partner_media_url;
    return (
      <div>
        <Card onClick={this.handleClickOpen}>
          <CardMedia
              className={classes.media}
              image={this.props.post.media_url}
              title="Post Image"/>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Card className='postDialog'>
            <CardHeader
              avatar={
              <Avatar
                aria-label="Recipe" 
                onClick={() => {this.handleAvatarClick(this.props.post.partner_id)}} 
                src={avatar_url}
              />   
              }
              action={
                <EditPost post={this.props.post}
                open={this.state.open}
                handleClose={this.handleClose}/>
              }
              title={this.props.post.title}
              subheader={String(this.props.dateConvert(this.props.post.date_created))}
            />
            <CardMedia
              className={classes.media}
              image={this.props.post.media_url}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography>
                  {this.props.post.content}
              </Typography>
            </CardContent>
          </Card>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PostDialog);