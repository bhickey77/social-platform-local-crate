import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '../../../node_modules/@material-ui/core';

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

class EditPost extends Component {
  state = {
    open: false,
    post: this.props.post
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = ( property ) => event => {
    this.setState({
        ...this.state,
        post: {
          ...this.state.post,
          [property]: event.target.value,
        }
    })
}

  render() {
    const { classes } = this.props;

    return (
      <div>
        <EditIcon onClick={this.handleClickOpen}/>
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
                        title={<TextField
                                value={this.state.post.title}
                                onChange={this.handleChange('title')}/>}
                    >
                    </CardHeader>
                    <CardMedia
                        className={classes.media}
                        image={this.state.post.media_url}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography>
                            <TextField
                            value={this.state.post.content}
                            onChange={this.handleChange('content')}
                            />
                        </Typography>
                    </CardContent>
                </Card>
        </Dialog>
        {/* </div> */}
      </div>
    );
  }
}

export default withStyles(styles)(EditPost);